import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { CAT_BRANDS, CAT_CONNECTIONS } from './cats.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import catsConfig from './config/cats.config';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,

    private readonly connection: Connection, // deprecated
    // private readonly configService: ConfigService, // deprecated

    // 为了使用catsConfiguration能够有智能提示
    @Inject(catsConfig.KEY)
    private readonly catsConfiguration: ConfigType<typeof catsConfig>,

    @Inject(CAT_BRANDS) private readonly catBrands: string[],

    @Inject(CAT_CONNECTIONS) private readonly cn: string[],
  ) {
    console.log(catBrands);
    console.log(cn);
    //配合app.config.ts以及cats.module.ts中ConfigModule
    // console.log(this.configService.get('database.host', 'localhost'));
    console.log(this.catsConfiguration.foo);
  }
  private readonly cats: Cat[] = [];

  async create(createCatDto: CreateCatDto) {
    const flavors = await Promise.all(
      createCatDto.flavors.map((item) => this.preloadFlavorByName(item)),
    );
    const cat = this.catRepository.create({ ...createCatDto, flavors });
    return await this.catRepository.save(cat);
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Cat[]> {
    const { offset, limit } = paginationQuery;
    return await this.catRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }
  async deleteOne(id: number) {
    const cat = await this.findOne(id);
    this.catRepository.remove(cat);
  }
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!cat) {
      throw new NotFoundException(`cat #${id} not found`);
    }
    return cat;
  }
  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const flavors =
      updateCatDto?.flavors &&
      (await Promise.all(
        updateCatDto.flavors.map((item) => this.preloadFlavorByName(item)),
      ));
    const cat = await this.catRepository.preload({
      id: id,
      ...updateCatDto, //why?
      flavors,
    });
    if (!cat) {
      throw new NotFoundException(`cat #${id} not found`);
    }
    return await this.catRepository.save(cat);
  }
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({
      where: { name: name },
    });
    if (flavor) {
      return flavor;
    }
    return await this.flavorRepository.create({ name });
  }

  async recommendCat(cat: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // cat.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommendation_cat';
      recommendEvent.type = 'cat';

      const newCat = await queryRunner.manager.save(Cat, { ...cat });
      recommendEvent.payload = { catId: newCat.id };
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error('transaction error');
    } finally {
      await queryRunner.release();
    }
  }
}

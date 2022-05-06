import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Address } from 'src/addresses/entities/address.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectModel(Dog.name) private readonly dogModel: Model<Dog>,
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { offset, limit } = paginationQuery;
    return await this.dogModel.find({}).skip(offset).limit(limit).exec();
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogModel.findOne({ _id: id }).exec();
    if (!dog) {
      throw new NotFoundException(`dog #${id} not found`);
    }
    return dog;
  }
  async create(createDogDto: CreateDogDto): Promise<Dog> {
    const dog = new this.dogModel(createDogDto);
    return await dog.save();
  }

  async update(id: string, updateDogDto: any): Promise<Dog> {
    const dog = await this.dogModel.findOneAndUpdate(
      { _id: id },
      { $set: updateDogDto },
      { new: true },
    );
    if (!dog) {
      throw new NotFoundException(`dog #${id} not found`);
    }
    return dog;
  }

  async deleteOne(id: string): Promise<Dog> {
    const dog = await this.findOne(id);
    return await dog.remove();
  }

  async recommendAddress(dog: Dog) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const dgM = new this.dogModel(dog);
      const newDog = await dgM.save({ session });

      const recommendAddress = new this.addressModel({
        name: 'recommend_dog',
        type: 'address',
        payload: { dogId: newDog.id },
      });
      await recommendAddress.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
    // config = {
    //   _id: 'tiny',
    //   members: [
    //     {
    //       _id: 0,
    //       host: 'mongo0:27017',
    //     },
    //     {
    //       _id: 1,
    //       host: 'mongo1:27018',
    //     },
    //     {
    //       _id: 2,
    //       host: 'mongo2:27019',
    //     },
    //   ],
    // }
  }
}

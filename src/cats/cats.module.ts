import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { CAT_BRANDS, CAT_CONNECTIONS } from './cats.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import catsConfig from './config/cats.config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CatBrandsFactory {
  create() {
    return ['xx', 'yy'];
  }
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, Flavor, Event]),
    ConfigModule.forFeature(catsConfig), // 从当前cats目录下读取配置
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    // { provide: CAT_BRANDS, useValue: ['xx', 'yy'] },
    CatBrandsFactory,
    {
      provide: CAT_BRANDS,
      useFactory: async (brandFactory: CatBrandsFactory) => ['xx', 'yy'],
      inject: [CatBrandsFactory],
    },
    {
      provide: CAT_CONNECTIONS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const catBrands = await connection.query('select * from catbrands');
        const cn = await Promise.resolve(['cn1', 'cn2']);
        return cn;
      },
      inject: [Connection],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {}

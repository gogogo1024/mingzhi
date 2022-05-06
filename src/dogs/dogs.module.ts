import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/addresses/entities/address.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog, DogSchema } from './entities/dog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dog.name, schema: DogSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}

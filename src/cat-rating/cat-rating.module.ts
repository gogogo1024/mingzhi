import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { DatabaseModule } from 'src/database/database.module';
import { CatRatingService } from './cat-rating.service';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
    }),
    CatsModule,
  ],
  providers: [CatRatingService],
})
export class CatRatingModule {}

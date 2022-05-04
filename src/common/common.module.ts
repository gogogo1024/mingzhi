import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [ConfigModule], //为了让ApiKeyGuard中能够使用ConfigService
  providers: [
    {
      provide: APP_GUARD, //APP_GUARD作用于全局，类似于app.useGlobalGuards
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule {}

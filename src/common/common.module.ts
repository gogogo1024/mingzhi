import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule], //为了让ApiKeyGuard中能够使用ConfigService
  providers: [
    {
      provide: APP_GUARD, //APP_GUARD作用于全局，类似于app.useGlobalGuards
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes('*');
  }
}

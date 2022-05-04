import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe as CustomerValidationPipe } from 'src/common/pipe/validation.pipe';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 用来控制基本类型的自动转换
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // class-transformer会自动转换根据TS的类型推导
      },
    }),
  );
  // 全局异常捕获
  // app.useGlobalPipes(new CustomerValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(3000);
}
bootstrap();

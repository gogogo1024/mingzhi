import { ValidationPipe } from '@nestjs/common';
import { CustomValidationPipe } from 'src/common/pipe/custom-validation.pipe';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 转换管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 用来控制plainToClass类型的自动转换
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // class-transformer会自动转换根据TS的类型推导
      },
    }),
  );
  // 全局异常捕获
  // app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // 拦截器
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Mingzhi')
    .setDescription('Mingzhi application')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

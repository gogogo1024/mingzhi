import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //尽可能使用类而不是实例来应用过滤器。它减少了内存使用，因为 Nest 可以轻松地在整个模块中重用同一个类。
  @Public()
  @Get('/nothing')
  @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter)
  async findNothing() {
    // ForbiddenException;
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}

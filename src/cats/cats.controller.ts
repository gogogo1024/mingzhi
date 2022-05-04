import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Res,
  SetMetadata,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

import { Response } from 'express';
import { DeleteCatDto } from './dto/delete-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';

@UsePipes(ValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {
    console.log('CatController created');
  }

  // @Post()
  // @HttpCode(204)
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  //   console.log(createCatDto);
  //   return 'This action adds a new cat';
  // }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto instanceof CreateCatDto); //涉及到plainToClass
    const cat = await this.catsService.create(createCatDto);
    return cat;
  }

  // @Get(':id')
  // async findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   const cat = await this.catsService.findOne(id);
  //   return cat;
  // }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() res: Response,
  ) {
    console.log(typeof id);
    const cat = await this.catsService.findOne(id);
    return res.status(HttpStatus.OK).json(cat);
  }

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const cats = await this.catsService.findAll(paginationQuery);
    return cats;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    console.log(typeof id);
    const cat = await this.catsService.update(id, updateCatDto);
    return cat;
  }
  @Delete()
  async remove(@Body() deleteCatDto: DeleteCatDto) {
    await this.catsService.deleteOne(deleteCatDto.id);
    return `This action removes a #${deleteCatDto.id} cat`;
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  async redirectOtherUrl() {
    return {
      url: 'http://pronhub.com',
      statusCode: 301,
    };
  }

  @Get('/nothing')
  //尽可能使用类而不是实例来应用过滤器。它减少了内存使用，因为 Nest 可以轻松地在整个模块中重用同一类的实例。
  // @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter)
  async findNothing() {
    ForbiddenException;
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
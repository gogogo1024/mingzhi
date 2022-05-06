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
  Patch,
  Post,
  Query,
  Redirect,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CustomValidationPipe } from '../common/pipe/custom-validation.pipe';

import { Response } from 'express';
import { DeleteCatDto } from './dto/delete-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
// @UsePipes(CustomValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {
    console.log('CatController created');
  }

  // @Post()
  // @HttpCode(204)
  // async create(@Body(new  CustomValidationPipe()) createCatDto: CreateCatDto) {
  //   console.log(createCatDto);
  //   return 'This action adds a new cat';
  // }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto instanceof CreateCatDto); //涉及到plainToClass
    const cat = await this.catsService.create(createCatDto);
    return cat;
  }

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

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    // 模拟请求耗时，用来测试timeout拦截器的效果
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cats = await this.catsService.findAll(paginationQuery);
    return cats;
  }

  @Patch(':id')
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

  @Post('/transaction')
  async recommendCat(@Body() createCatDto: any) {
    await this.catsService.recommendCat(createCatDto);
    return `This  transaction successful`;
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  async redirectOtherUrl() {
    return {
      url: 'http://pronhub.com',
      statusCode: 301,
    };
  }
}

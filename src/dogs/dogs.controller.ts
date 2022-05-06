import { Controller, ValidationPipe } from '@nestjs/common';

import {
  Body,
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
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
// import { Cat } from './interfaces/dog.interface';

import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CustomValidationPipe } from '../common/pipe/custom-validation.pipe';

import { Response } from 'express';
import { DeleteDogDto } from './dto/delete-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('dogs')
@UsePipes(ValidationPipe)
@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {
    console.log('DogController created');
  }

  // @Post()
  // @HttpCode(204)
  // async create(@Body(new ValidationPipe()) createCatDto: CreateDogDto) {
  //   console.log(createCatDto);
  //   return 'This action adds a new dog';
  // }

  @Post()
  async create(@Body() createCatDto: CreateDogDto) {
    console.log(createCatDto instanceof CreateDogDto); //涉及到plainToClass
    const dog = await this.dogsService.create(createCatDto);
    return dog;
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    console.log(typeof id);
    const dog = await this.dogsService.findOne(id);
    return res.status(HttpStatus.OK).json(dog);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    const cats = await this.dogsService.findAll(paginationQuery);
    return cats;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    console.log(typeof id);
    const dog = await this.dogsService.update(id, updateDogDto);
    return dog;
  }
  @Delete()
  async remove(@Body() deleteDogDto: DeleteDogDto) {
    await this.dogsService.deleteOne(deleteDogDto.id);
    return `This action removes a #${deleteDogDto.id} dog`;
  }

  @Post('/transaction')
  async recommendAddress(@Body() createDogDto: any) {
    await this.dogsService.recommendAddress(createDogDto);
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

  //尽可能使用类而不是实例来应用过滤器。它减少了内存使用，因为 Nest 可以轻松地在整个模块中重用同一个类。
  @Get('/nothing')
  @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter)
  async findNothing() {
    ForbiddenException;
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}

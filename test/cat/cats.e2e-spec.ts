import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CatsModule } from '../../src/cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';

describe('[Feature Cats - /cats]', () => {
  const cat = {
    name: 'cat5',
    age: 36,
    breed: 'A',
    flavors: ['xi', 'ha'],
  };
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CatsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it.todo('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send(cat as CreateCatDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCat = jasmine.objectContaining(
          cat.flavors.map((name) => jasmine.objectContaining({ name })),
        );
        expect(body).toEqual(expectedCat);
      });
  });
  it.todo('Get all [GET /]');
  it.todo('Get one [Get /:id]');
  it.todo('Delete one [Delete /');

  afterAll(async () => {
    await app.close();
  });
});

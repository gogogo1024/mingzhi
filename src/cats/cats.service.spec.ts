import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import catsConfig from './config/cats.config';
import { CAT_BRANDS, CAT_CONNECTIONS } from './cats.constants';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe('CatsService', () => {
  let service: CatsService;
  let catRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // 需要把cats.services.ts中所有的Inject()的字段写入到provide
      providers: [
        CatsService,
        {
          provide: Connection,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: CAT_CONNECTIONS,
          useValue: {},
        },

        {
          provide: catsConfig.KEY,
          useValue: {},
        },
        {
          provide: CAT_BRANDS,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Event),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Cat),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catRepository = module.get<MockRepository>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when cat with ID exits', () => {
      it('should return the cat object', async () => {
        const expectedCat = {
          id: 18,
          name: 'cats3',
          age: 3,
          recommendations: 0,
          breed: 'B',
          flavors: [{ id: 1, name: 'choco' }],
        };
        catRepository.findOne.mockReturnValue(expectedCat);
        const cat = await service.findOne(18);
        expect(cat).toEqual(expectedCat);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        catRepository.findOne.mockReturnValue(undefined);
        const id = 1;
        try {
          await service.findOne(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`cat #${id} not found`);
        }
      });
    });
  });
});

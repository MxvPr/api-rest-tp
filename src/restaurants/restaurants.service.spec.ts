import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  const mockRestaurant = {
    id: 1,
    name: 'Test Restaurant',
    description: 'Test Description',
    address: 'Test Address',
    menus: ['Menu 1', 'Menu 2'],
    note: '4.5',
    schedules: '9-22'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: {
            save: jest.fn().mockResolvedValue(mockRestaurant),
            find: jest.fn().mockResolvedValue([mockRestaurant]),
            findOne: jest.fn().mockResolvedValue(mockRestaurant),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto = {
        name: 'Test Restaurant',
        description: 'Test Description',
        address: 'Test Address',
        menus: ['Menu 1', 'Menu 2'],
        note: '4.5',
        schedules: '9-22'
      };

      const result = await service.create(createRestaurantDto);
      expect(result).toEqual(mockRestaurant);
      expect(repository.save).toHaveBeenCalledWith(expect.any(Restaurant));
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const result = await service.findAll();
      expect(result).toBe('This action returns all restaurants');
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      const result = await service.findOne(1);
      expect(result).toBe('This action returns a #1 restaurant');
    });
  });
});

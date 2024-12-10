import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

describe('MenusService', () => {
  let service: MenusService;
  let repository: Repository<Menu>;

  const mockMenuRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: getRepositoryToken(Menu),
          useValue: mockMenuRepository,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
    repository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new menu', async () => {
      const createMenuDto = {
        name: 'Test Menu',
        description: 'Test Description',
        prix: 10,
        restaurant: null
      };

      const result = await service.create(createMenuDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Food' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Food' }),
    create: jest.fn().mockResolvedValue({ id: '1', name: 'Food' }),
    update: jest.fn().mockResolvedValue({ id: '1', name: 'Groceries' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1', name: 'Food' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one category', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', name: 'Food' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = { name: 'Food' };
    expect(await controller.create(dto)).toEqual({ id: '1', name: 'Food' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update a category', async () => {
    const dto: UpdateCategoryDto = { name: 'Groceries' };
    expect(await controller.update('1', dto)).toEqual({ id: '1', name: 'Groceries' });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a category', async () => {
    expect(await controller.remove('1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

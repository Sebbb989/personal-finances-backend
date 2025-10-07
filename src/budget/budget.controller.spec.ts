import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budget.dto';

describe('BudgetController', () => {
  let controller: BudgetController;
  let service: BudgetService;

  const mockBudgetService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', amount: 100 }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', amount: 100 }),
    create: jest.fn().mockResolvedValue({ id: '1', amount: 100 }),
    update: jest.fn().mockResolvedValue({ id: '1', amount: 200 }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        { provide: BudgetService, useValue: mockBudgetService },
      ],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
    service = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all budgets', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1', amount: 100 }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one budget', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', amount: 100 });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a budget', async () => {
    const dto: CreateBudgetDto = { userId: '1', categoryId: '1', amount: 100, startDate: '2023-01-01', endDate: '2023-12-31' };
    expect(await controller.create(dto)).toEqual({ id: '1', amount: 100 });
    expect(service.create).toHaveBeenCalled();
  });

  it('should update a budget', async () => {
    const dto: UpdateBudgetDto = { amount: 200 };
    expect(await controller.update('1', dto)).toEqual({ id: '1', amount: 200 });
    expect(service.update).toHaveBeenCalledWith('1', expect.objectContaining(dto));
  });

  it('should remove a budget', async () => {
    expect(await controller.remove('1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

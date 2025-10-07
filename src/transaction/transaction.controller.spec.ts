import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', amount: 50, userId: '1', type: 'expense', categoryId: '1' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', amount: 50, userId: '1', type: 'expense', categoryId: '1' }),
    create: jest.fn().mockResolvedValue({ id: '1', amount: 50 }),
    update: jest.fn().mockResolvedValue({ id: '1', amount: 100 }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all transactions', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1', amount: 50, userId: '1', type: 'expense', categoryId: '1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one transaction', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', amount: 50, userId: '1', type: 'expense', categoryId: '1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a transaction', async () => {
    const dto: CreateTransactionDto = { userId: '1', categoryId: '1', amount: 50, type: 'expense' };
    expect(await controller.create(dto)).toEqual({ id: '1', amount: 50 });
    expect(service.create).toHaveBeenCalled();
  });

  it('should update a transaction', async () => {
    const dto: UpdateTransactionDto = { amount: 100 };
    expect(await controller.update('1', dto)).toEqual({ id: '1', amount: 100 });
    expect(service.update).toHaveBeenCalledWith('1', expect.objectContaining(dto));
  });

  it('should remove a transaction', async () => {
    expect(await controller.remove('1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

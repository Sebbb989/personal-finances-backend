import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const mockPrismaService = { transaction: { findMany: jest.fn() } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: require('../prisma/prisma.service').PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

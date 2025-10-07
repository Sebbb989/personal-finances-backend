import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const mockPrismaService = { category: { findMany: jest.fn() } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: require('../prisma/prisma.service').PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

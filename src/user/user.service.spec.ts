import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockPrismaService = { user: { findMany: jest.fn() } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: require('../prisma/prisma.service').PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

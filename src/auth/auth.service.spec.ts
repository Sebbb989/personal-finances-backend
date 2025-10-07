import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockPrismaService = { user: { findUnique: jest.fn() } };
    const mockJwtService = { sign: jest.fn(), verify: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: require('../prisma/prisma.service').PrismaService, useValue: mockPrismaService },
        { provide: require('../jwt/jwt.service').JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

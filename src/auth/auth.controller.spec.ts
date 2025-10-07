import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test' }),
    validateUser: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test' }),
    login: jest.fn().mockResolvedValue({ access_token: 'jwt.token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: RegisterDto = { email: 'test@test.com', password: '123456', name: 'Test' };
    expect(await controller.register(dto)).toEqual({ id: '1', email: 'test@test.com', name: 'Test' });
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto: LoginDto = { email: 'test@test.com', password: '123456' };
    (service.validateUser as jest.Mock).mockResolvedValueOnce({ id: '1', email: 'test@test.com', name: 'Test' });
    expect(await controller.login(dto)).toEqual({ access_token: 'jwt.token' });
    expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    expect(service.login).toHaveBeenCalled();
  });
});

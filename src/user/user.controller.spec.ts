import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', email: 'test@test.com', name: 'Test' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test' }),
    create: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test' }),
    update: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'Test Updated' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    expect(await controller.findAll()).toEqual([{ id: '1', email: 'test@test.com', name: 'Test' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one user', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', email: 'test@test.com', name: 'Test' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { email: 'test@test.com', password: '123456', name: 'Test' };
    expect(await controller.create(dto)).toEqual({ id: '1', email: 'test@test.com', name: 'Test' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Test Updated' };
    expect(await controller.update('1', dto)).toEqual({ id: '1', email: 'test@test.com', name: 'Test Updated' });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a user', async () => {
    expect(await controller.remove('1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

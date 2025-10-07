import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const user = await this.userService.findOne(id);
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	@Post()
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateUserDto) {
		return this.userService.create(body);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.userService.update(id, body);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}

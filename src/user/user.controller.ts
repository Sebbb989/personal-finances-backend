import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'All users returned.' })
	async findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a user by ID' })
	@ApiResponse({ status: 200, description: 'User found.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	async findOne(@Param('id') id: string) {
		const user = await this.userService.findOne(id);
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({ status: 201, description: 'User created.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateUserDto) {
		return this.userService.create(body);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a user by ID' })
	@ApiResponse({ status: 200, description: 'User updated.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.userService.update(id, body);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a user by ID' })
	@ApiResponse({ status: 200, description: 'User deleted.' })
	async remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}

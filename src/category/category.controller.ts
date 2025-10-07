import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({ status: 200, description: 'All categories returned.' })
	async findAll() {
		return this.categoryService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a category by ID' })
	@ApiResponse({ status: 200, description: 'Category found.' })
	@ApiResponse({ status: 404, description: 'Category not found.' })
	async findOne(@Param('id') id: string) {
		const category = await this.categoryService.findOne(id);
		if (!category) throw new NotFoundException('Category not found');
		return category;
	}

	@Post()
	@ApiOperation({ summary: 'Create a new category' })
	@ApiResponse({ status: 201, description: 'Category created.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateCategoryDto) {
		return this.categoryService.create(body);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a category by ID' })
	@ApiResponse({ status: 200, description: 'Category updated.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
		return this.categoryService.update(id, body);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a category by ID' })
	@ApiResponse({ status: 200, description: 'Category deleted.' })
	async remove(@Param('id') id: string) {
		return this.categoryService.remove(id);
	}
}

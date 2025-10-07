import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async findAll() {
		return this.categoryService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const category = await this.categoryService.findOne(id);
		if (!category) throw new NotFoundException('Category not found');
		return category;
	}

	@Post()
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateCategoryDto) {
		return this.categoryService.create(body);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
		return this.categoryService.update(id, body);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.categoryService.remove(id);
	}
}

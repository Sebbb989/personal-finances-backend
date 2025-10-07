import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.category.findMany();
	}

	async findOne(id: string) {
		return this.prisma.category.findUnique({ where: { id } });
	}

	async create(data: { name: string, color?: string }) {
		return this.prisma.category.create({ data });
	}

	async update(id: string, data: Partial<{ name: string, color: string }>) {
		return this.prisma.category.update({ where: { id }, data });
	}

	async remove(id: string) {
		return this.prisma.category.delete({ where: { id } });
	}
}

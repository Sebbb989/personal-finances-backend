import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.budget.findMany({ include: { user: true, category: true } });
	}

	async findOne(id: string) {
		return this.prisma.budget.findUnique({ where: { id }, include: { user: true, category: true } });
	}

	async create(data: { userId: string, categoryId: string, amount: number, startDate: Date, endDate: Date }) {
		return this.prisma.budget.create({ data });
	}

	async update(id: string, data: Partial<{ userId: string, categoryId: string, amount: number, startDate: Date, endDate: Date }>) {
		return this.prisma.budget.update({ where: { id }, data });
	}

	async remove(id: string) {
		return this.prisma.budget.delete({ where: { id } });
	}
}

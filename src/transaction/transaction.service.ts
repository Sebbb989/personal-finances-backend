import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.transaction.findMany({ include: { user: true, category: true } });
	}

	async findOne(id: string) {
		return this.prisma.transaction.findUnique({ where: { id }, include: { user: true, category: true } });
	}

	async create(data: { userId: string, categoryId: string, amount: number, type: string, description?: string, date?: Date }) {
		return this.prisma.transaction.create({ data });
	}

	async update(id: string, data: Partial<{ userId: string, categoryId: string, amount: number, type: string, description?: string, date?: Date }>) {
		return this.prisma.transaction.update({ where: { id }, data });
	}

	async remove(id: string) {
		return this.prisma.transaction.delete({ where: { id } });
	}
}

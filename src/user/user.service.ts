import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(id: string) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async create(data: { email: string, password: string, name: string }) {
		const hashed = await bcrypt.hash(data.password, 10);
		return this.prisma.user.create({ data: { ...data, password: hashed } });
	}

	async update(id: string, data: Partial<{ email: string, password: string, name: string }>) {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, 10);
		}
		return this.prisma.user.update({ where: { id }, data });
	}

	async remove(id: string) {
		return this.prisma.user.delete({ where: { id } });
	}
}

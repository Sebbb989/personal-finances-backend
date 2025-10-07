import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (user && await bcrypt.compare(pass, user.password)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(data: { email: string, password: string, name: string }) {
		// Check for duplicate email
		const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
		if (existing) {
			throw new BadRequestException('Email already exists');
		}
		const hashed = await bcrypt.hash(data.password, 10);
		const user = await this.prisma.user.create({
			data: { ...data, password: hashed },
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...result } = user;
		return result;
	}
}

import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtService {
	constructor(private readonly jwt: NestJwtService) {}

	sign(payload: any, options?: JwtSignOptions) {
		return this.jwt.sign(payload, options);
	}
}

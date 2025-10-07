import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Register a new user' })
	@ApiResponse({ status: 201, description: 'User registered.' })
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login and receive JWT' })
	@ApiResponse({ status: 200, description: 'JWT token returned.' })
	async login(@Body() dto: LoginDto) {
		const user = await this.authService.validateUser(dto.email, dto.password);
		if (!user) throw new Error('Invalid credentials');
		return this.authService.login(user);
	}
}

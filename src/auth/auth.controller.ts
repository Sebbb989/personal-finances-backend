import { Controller, Post, Body, BadRequestException, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

		@Post('register')
		@ApiOperation({ summary: 'Register a new user' })
		@ApiResponse({ status: 201, description: 'User registered.' })
		@ApiBadRequestResponse({ description: 'Validation failed or email already exists.' })
		@UsePipes(new ValidationPipe({ whitelist: true }))
		async register(@Body() dto: RegisterDto) {
			try {
				return await this.authService.register(dto);
			} catch (err) {
				if (err instanceof BadRequestException) throw err;
				throw new BadRequestException('Validation failed');
			}
		}

		@Post('login')
		@ApiOperation({ summary: 'Login and receive JWT' })
		@ApiResponse({ status: 200, description: 'JWT token returned.' })
		@ApiBadRequestResponse({ description: 'Validation failed.' })
		@ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
		@UsePipes(new ValidationPipe({ whitelist: true }))
		async login(@Body() dto: LoginDto) {
			try {
				const user = await this.authService.validateUser(dto.email, dto.password);
				if (!user) throw new UnauthorizedException('Invalid credentials');
				return this.authService.login(user);
			} catch (err) {
				if (err instanceof UnauthorizedException) throw err;
				throw new BadRequestException('Validation failed');
			}
		}
}

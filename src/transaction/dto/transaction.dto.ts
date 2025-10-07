import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 'userId123' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'categoryId123' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'expense', description: "'income' or 'expense'" })
  @IsString()
  type: string; // 'income' or 'expense'

  @ApiPropertyOptional({ example: 'Dinner at restaurant' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2025-10-07' })
  @IsDateString()
  @IsOptional()
  date?: string;
}

export class UpdateTransactionDto {
  @ApiPropertyOptional({ example: 'userId123' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'categoryId123' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ example: 'expense', description: "'income' or 'expense'" })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ example: 'Dinner at restaurant' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2025-10-07' })
  @IsDateString()
  @IsOptional()
  date?: string;
}

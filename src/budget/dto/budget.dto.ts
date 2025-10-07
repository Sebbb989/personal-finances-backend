import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBudgetDto {
  @ApiProperty({ example: 'userId123' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'categoryId123' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2025-01-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-01-31' })
  @IsDateString()
  endDate: string;
}

export class UpdateBudgetDto {
  @ApiPropertyOptional({ example: 'userId123' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'categoryId123' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ example: '2025-01-01' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-01-31' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Groceries' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '#FF5733' })
  @IsString()
  @IsOptional()
  color?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Groceries' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '#FF5733' })
  @IsString()
  @IsOptional()
  color?: string;
}

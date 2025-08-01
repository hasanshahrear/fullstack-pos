import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  categoryName: string;

  @IsString()
  categoryCode: string;

  @IsNumber()
  @IsOptional()
  parentCategoryId?: number;

  @IsString()
  @IsOptional()
  categoryImage?: string;

  @IsString()
  @IsOptional()
  categoryColor?: string;

  @IsNumber()
  categorySort: number;

  @IsBoolean()
  categoryStatus: boolean;
}

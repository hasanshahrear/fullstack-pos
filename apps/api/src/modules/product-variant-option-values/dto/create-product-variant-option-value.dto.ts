import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductVariantOptionValueDto {
  @IsString()
  optionValueName: string;

  @IsNumber()
  variantOptionId: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

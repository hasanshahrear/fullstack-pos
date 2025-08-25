import { EDiscountType } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  variantName: string;

  @IsNumber()
  @Min(0)
  variantQuantity: number;

  @IsNumber()
  @Min(0)
  variantPrice: number;

  @IsEnum(EDiscountType)
  @IsOptional()
  variantDiscountType?: EDiscountType;

  @IsNumber()
  @IsOptional()
  @Min(0)
  variantDiscountedValue?: number;

  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  variantOptionId: number;

  @IsNumber()
  variantOptionValueId: number;

  @IsNumber()
  @IsOptional()
  id?: number;
}

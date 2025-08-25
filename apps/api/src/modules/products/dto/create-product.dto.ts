import { EDiscountType, EProductType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsString()
  productSKU: string;

  @IsNumber()
  @Min(0)
  minQuantity: number;

  @IsNumber()
  @Min(0)
  stockAlert: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(EDiscountType)
  @IsOptional()
  discountType?: EDiscountType;

  @IsNumber()
  @IsOptional()
  @Min(0)
  discountedValue?: number;

  @IsString()
  @IsOptional()
  expireDate?: string;

  @IsBoolean()
  isAddonProduct: boolean;

  @IsString()
  @IsOptional()
  productDescription?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsEnum(EProductType)
  productType: EProductType;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  brandId?: number;

  @IsNumber()
  salesUnitId: number;

  @IsNumber()
  @IsOptional()
  taxId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  @IsOptional()
  variants?: CreateProductVariantDto[];
}

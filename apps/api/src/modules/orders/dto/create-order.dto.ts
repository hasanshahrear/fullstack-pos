import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EOrderStatus } from '@prisma/client';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsOptional()
  productVariantId?: number;

  @IsNumber()
  @IsOptional()
  warehouseId?: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsOptional()
  taxId?: number;

  @IsNumber()
  @IsOptional()
  couponId?: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsNumber()
  @IsOptional()
  branchId?: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsOptional()
  taxId?: number;

  @IsNumber()
  @IsOptional()
  couponId?: number;

  @IsEnum(EOrderStatus)
  @IsNotEmpty()
  status: EOrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}

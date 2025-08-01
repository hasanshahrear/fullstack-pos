import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ETransferStatus } from '@prisma/client';

export class CreateStockTransferDto {
  @IsNotEmpty()
  @IsString()
  transferNumber: string;

  @IsNotEmpty()
  @IsInt()
  fromWarehouseId: number;

  @IsNotEmpty()
  @IsInt()
  toWarehouseId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  productVariantId?: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsEnum(ETransferStatus)
  @IsNotEmpty()
  status: ETransferStatus;
}

import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBinInventoryDto {
  @IsInt()
  @IsNotEmpty()
  warehouseId: number;

  @IsInt()
  @IsNotEmpty()
  binId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsOptional()
  productVariantId?: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

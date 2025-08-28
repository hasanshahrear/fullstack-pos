import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateGroupProductDto {
  @IsNumber()
  groupProductId: number;

  @IsNumber()
  @Min(1)
  groupProductQuantity: number;

  @IsNumber()
  @IsOptional()
  groupProductVariantId?: number;
}

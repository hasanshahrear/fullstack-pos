import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProductVariantOptionDto {
  @IsString()
  optionName: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

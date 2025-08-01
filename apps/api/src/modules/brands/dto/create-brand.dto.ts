import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  brandName: string;

  @IsString()
  brandCode: string;

  @IsString()
  @IsOptional()
  brandImage?: string;

  @IsBoolean()
  brandStatus: boolean;
}

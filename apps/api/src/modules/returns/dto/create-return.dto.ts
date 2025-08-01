import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsNotEmpty()
  @IsNumber()
  totalRefund: number;

  @IsBoolean()
  @IsOptional()
  processed?: boolean;
}

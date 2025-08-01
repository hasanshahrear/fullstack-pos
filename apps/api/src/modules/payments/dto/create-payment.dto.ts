import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EPaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsEnum(EPaymentStatus)
  @IsNotEmpty()
  paymentStatus: EPaymentStatus;

  @IsString()
  @IsOptional()
  transactionId?: string;
}

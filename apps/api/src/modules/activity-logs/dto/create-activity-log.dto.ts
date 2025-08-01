import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityLogDto {
  @IsOptional()
  @Type(() => Number)
  userId?: number;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  target?: string;

  @IsOptional()
  @IsJSON()
  meta?: Record<string, any>;
}

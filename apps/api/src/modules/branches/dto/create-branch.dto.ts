import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

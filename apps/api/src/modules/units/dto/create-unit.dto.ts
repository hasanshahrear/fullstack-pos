import { IsString, IsBoolean } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  unitName: string;

  @IsString()
  unitShortName: string;

  @IsBoolean()
  isActive: boolean;
}

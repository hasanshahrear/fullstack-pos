import { PartialType } from '@nestjs/mapped-types';
import { CreateBinInventoryDto } from './create-bin-inventory.dto';

export class UpdateBinInventoryDto extends PartialType(CreateBinInventoryDto) {}

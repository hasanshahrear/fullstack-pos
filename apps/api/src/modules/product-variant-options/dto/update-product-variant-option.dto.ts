import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantOptionDto } from './create-product-variant-option.dto';

export class UpdateProductVariantOptionDto extends PartialType(CreateProductVariantOptionDto) {}

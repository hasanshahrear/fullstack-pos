import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantOptionValuesService } from './product-variant-option-values.service';
import { CreateProductVariantOptionValueDto } from './dto/create-product-variant-option-value.dto';
import { UpdateProductVariantOptionValueDto } from './dto/update-product-variant-option-value.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('product-variant-option-values')
@UseGuards(JwtAuthGuard)
export class ProductVariantOptionValuesController {
  constructor(
    private readonly productVariantOptionValuesService: ProductVariantOptionValuesService,
  ) {}

  @Post()
  create(
    @Body()
    createProductVariantOptionValueDto: CreateProductVariantOptionValueDto,
  ) {
    return this.productVariantOptionValuesService.create(
      createProductVariantOptionValueDto,
    );
  }

  @Get()
  findAll() {
    return this.productVariantOptionValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantOptionValuesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProductVariantOptionValueDto: UpdateProductVariantOptionValueDto,
  ) {
    return this.productVariantOptionValuesService.update(
      +id,
      updateProductVariantOptionValueDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantOptionValuesService.remove(+id);
  }
}

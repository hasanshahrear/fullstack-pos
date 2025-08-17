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
import { ProductVariantOptionsService } from './product-variant-options.service';
import { CreateProductVariantOptionDto } from './dto/create-product-variant-option.dto';
import { UpdateProductVariantOptionDto } from './dto/update-product-variant-option.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('product-variant-options')
@UseGuards(JwtAuthGuard)
export class ProductVariantOptionsController {
  constructor(
    private readonly productVariantOptionsService: ProductVariantOptionsService,
  ) {}

  @Post()
  create(@Body() createProductVariantOptionDto: CreateProductVariantOptionDto) {
    return this.productVariantOptionsService.create(
      createProductVariantOptionDto,
    );
  }

  @Get()
  findAll() {
    return this.productVariantOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantOptionDto: UpdateProductVariantOptionDto,
  ) {
    return this.productVariantOptionsService.update(
      +id,
      updateProductVariantOptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantOptionsService.remove(+id);
  }
}

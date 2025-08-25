import { Module } from '@nestjs/common';
import { ProductVariantOptionValuesService } from './product-variant-option-values.service';
import { ProductVariantOptionValuesController } from './product-variant-option-values.controller';
import { HttpResponseModule } from '../http-response/http-response.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpResponseModule, PrismaModule],
  controllers: [ProductVariantOptionValuesController],
  providers: [ProductVariantOptionValuesService],
})
export class ProductVariantOptionValuesModule {}

import { Module } from '@nestjs/common';
import { ProductVariantOptionsService } from './product-variant-options.service';
import { ProductVariantOptionsController } from './product-variant-options.controller';
import { HttpResponseModule } from '../http-response/http-response.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpResponseModule, PrismaModule],
  controllers: [ProductVariantOptionsController],
  providers: [ProductVariantOptionsService],
  exports: [ProductVariantOptionsService],
})
export class ProductVariantOptionsModule {}

import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { HttpResponseModule } from '../http-response/http-response.module';

@Module({
  imports: [PrismaModule, HttpResponseModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}

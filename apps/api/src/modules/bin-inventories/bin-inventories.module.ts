import { Module } from '@nestjs/common';
import { BinInventoriesService } from './bin-inventories.service';
import { BinInventoriesController } from './bin-inventories.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BinInventoriesController],
  providers: [BinInventoriesService],
  exports: [BinInventoriesService],
})
export class BinInventoriesModule {}

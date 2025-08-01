import { Module } from '@nestjs/common';
import { BinsService } from './bins.service';
import { BinsController } from './bins.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BinsController],
  providers: [BinsService],
  exports: [BinsService],
})
export class BinsModule {}

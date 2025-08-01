import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { BranchesController } from './branches.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}

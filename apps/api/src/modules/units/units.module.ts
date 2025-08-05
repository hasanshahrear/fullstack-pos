import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { HttpResponseModule } from '../http-response/http-response.module';

@Module({
  imports: [PrismaModule, HttpResponseModule],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}

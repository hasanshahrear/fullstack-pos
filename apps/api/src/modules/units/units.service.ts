import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  create(createUnitDto: CreateUnitDto) {
    return this.prisma.unit.create({
      data: createUnitDto,
      include: {
        products: true,
      },
    });
  }

  findAll() {
    return this.prisma.unit.findMany({
      include: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.unit.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
      include: {
        products: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.unit.delete({
      where: { id },
    });
  }
}

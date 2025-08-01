import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: createSupplierDto,
      include: {
        purchases: true,
      },
    });
  }

  findAll() {
    return this.prisma.supplier.findMany({
      include: {
        purchases: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.supplier.findUnique({
      where: { id },
      include: {
        purchases: true,
      },
    });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
      include: {
        purchases: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}

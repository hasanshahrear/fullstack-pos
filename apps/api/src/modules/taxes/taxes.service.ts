import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from '@prisma/client';

@Injectable()
export class TaxesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaxDto: CreateTaxDto): Promise<Tax> {
    return this.prisma.tax.create({
      data: {
        taxName: createTaxDto.name,
        taxCode: createTaxDto.name.toLowerCase().replace(/\s+/g, '_'),
        taxRate: createTaxDto.rate,
        isActive: true,
      },
    });
  }

  findAll(): Promise<Tax[]> {
    return this.prisma.tax.findMany({
      include: {
        products: true,
        categories: true,
        orderItems: true,
        orders: true,
      },
    });
  }

  findOne(id: number): any {
    return this.prisma.tax.findUnique({
      where: { id },
      include: {
        products: true,
        categories: true,
        orderItems: true,
        orders: true,
      },
    });
  }

  update(id: number, updateTaxDto: UpdateTaxDto): Promise<Tax> {
    const updateData: any = {};

    if (updateTaxDto.name) {
      updateData.taxName = updateTaxDto.name;
      updateData.taxCode = updateTaxDto.name.toLowerCase().replace(/\s+/g, '_');
    }
    if (updateTaxDto.rate !== undefined) {
      updateData.taxRate = updateTaxDto.rate;
    }

    return this.prisma.tax.update({
      where: { id },
      data: updateData,
      include: {
        products: true,
        categories: true,
        orderItems: true,
        orders: true,
      },
    });
  }

  remove(id: number): Promise<Tax> {
    return this.prisma.tax.delete({
      where: { id },
    });
  }
}

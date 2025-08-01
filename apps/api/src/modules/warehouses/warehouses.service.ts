import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import type { Warehouse } from '@prisma/client';

@Injectable()
export class WarehousesService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    branch: true,
    bins: true,
    purchases: true,
    binInventories: true,
    stockTransfersFrom: true,
    stockTransfersTo: true,
    orderItems: true,
  } as const;

  create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.prisma.warehouse.create({
      data: {
        warehouseName: createWarehouseDto.name,
        warehouseCode: createWarehouseDto.code,
        branchId: createWarehouseDto.branchId,
        isActive: createWarehouseDto.isActive ?? true,
      },
      include: this.include,
    });
  }

  findAll(): Promise<Warehouse[]> {
    return this.prisma.warehouse.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<Warehouse | null> {
    return this.prisma.warehouse.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    const updateData = {
      ...(updateWarehouseDto.name && {
        warehouseName: updateWarehouseDto.name,
      }),
      ...(updateWarehouseDto.code && {
        warehouseCode: updateWarehouseDto.code,
      }),
      ...(updateWarehouseDto.branchId && {
        branchId: updateWarehouseDto.branchId,
      }),
      ...(updateWarehouseDto.isActive !== undefined && {
        isActive: updateWarehouseDto.isActive,
      }),
    };

    return this.prisma.warehouse.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<Warehouse> {
    return this.prisma.warehouse.delete({
      where: { id },
      include: this.include,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBinInventoryDto } from './dto/create-bin-inventory.dto';
import { UpdateBinInventoryDto } from './dto/update-bin-inventory.dto';
import type { BinInventory } from '@prisma/client';

@Injectable()
export class BinInventoriesService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    warehouse: true,
    bin: true,
    product: true,
    productVariant: true,
  } as const;

  create(createBinInventoryDto: CreateBinInventoryDto): Promise<BinInventory> {
    return this.prisma.binInventory.create({
      data: {
        warehouseId: createBinInventoryDto.warehouseId,
        binId: createBinInventoryDto.binId,
        productId: createBinInventoryDto.productId,
        productVariantId: createBinInventoryDto.productVariantId,
        quantity: createBinInventoryDto.quantity,
      },
      include: this.include,
    });
  }

  findAll(): Promise<BinInventory[]> {
    return this.prisma.binInventory.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<BinInventory | null> {
    return this.prisma.binInventory.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(
    id: number,
    updateBinInventoryDto: UpdateBinInventoryDto,
  ): Promise<BinInventory> {
    const updateData = {
      ...(updateBinInventoryDto.warehouseId && {
        warehouseId: updateBinInventoryDto.warehouseId,
      }),
      ...(updateBinInventoryDto.binId && {
        binId: updateBinInventoryDto.binId,
      }),
      ...(updateBinInventoryDto.productId && {
        productId: updateBinInventoryDto.productId,
      }),
      ...(updateBinInventoryDto.productVariantId && {
        productVariantId: updateBinInventoryDto.productVariantId,
      }),
      ...(updateBinInventoryDto.quantity && {
        quantity: updateBinInventoryDto.quantity,
      }),
    };

    return this.prisma.binInventory.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<BinInventory> {
    return this.prisma.binInventory.delete({
      where: { id },
      include: this.include,
    });
  }
}

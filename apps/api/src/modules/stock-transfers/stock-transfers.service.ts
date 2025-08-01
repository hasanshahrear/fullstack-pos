import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import type { Prisma, StockTransfer } from '@prisma/client';

@Injectable()
export class StockTransfersService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    fromWarehouse: true,
    toWarehouse: true,
    product: true,
    productVariant: true,
  } as const;

  create(
    createStockTransferDto: CreateStockTransferDto,
  ): Promise<StockTransfer> {
    return this.prisma.stockTransfer.create({
      data: createStockTransferDto,
      include: this.include,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StockTransferWhereUniqueInput;
    where?: Prisma.StockTransferWhereInput;
    orderBy?: Prisma.StockTransferOrderByWithRelationInput;
  }): Promise<StockTransfer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.stockTransfer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    });
  }

  findOne(
    where: Prisma.StockTransferWhereUniqueInput,
  ): Promise<StockTransfer | null> {
    return this.prisma.stockTransfer.findUnique({
      where,
      include: this.include,
    });
  }

  update(params: {
    where: Prisma.StockTransferWhereUniqueInput;
    data: Prisma.StockTransferUpdateInput;
  }): Promise<StockTransfer> {
    const { where, data } = params;
    return this.prisma.stockTransfer.update({
      data,
      where,
      include: this.include,
    });
  }

  remove(where: Prisma.StockTransferWhereUniqueInput): Promise<StockTransfer> {
    return this.prisma.stockTransfer.delete({
      where,
      include: this.include,
    });
  }

  findByTransferNumber(transferNumber: string): Promise<StockTransfer | null> {
    return this.prisma.stockTransfer.findUnique({
      where: { transferNumber },
      include: this.include,
    });
  }

  findByWarehouse(warehouseId: number): Promise<StockTransfer[]> {
    return this.prisma.stockTransfer.findMany({
      where: {
        OR: [{ fromWarehouseId: warehouseId }, { toWarehouseId: warehouseId }],
      },
      include: this.include,
    });
  }

  findByProduct(productId: number): Promise<StockTransfer[]> {
    return this.prisma.stockTransfer.findMany({
      where: { productId },
      include: this.include,
    });
  }
}

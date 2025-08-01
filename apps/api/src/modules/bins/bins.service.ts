import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import type { Bin } from '@prisma/client';

@Injectable()
export class BinsService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    warehouse: true,
    binInventories: true,
  } as const;

  create(createBinDto: CreateBinDto): Promise<Bin> {
    return this.prisma.bin.create({
      data: {
        binCode: createBinDto.code,
        warehouseId: createBinDto.warehouseId,
        description: createBinDto.description,
        isActive: createBinDto.isActive ?? true,
      },
      include: this.include,
    });
  }

  findAll(): Promise<Bin[]> {
    return this.prisma.bin.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<Bin | null> {
    return this.prisma.bin.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, updateBinDto: UpdateBinDto): Promise<Bin> {
    const updateData = {
      ...(updateBinDto.code && { binCode: updateBinDto.code }),
      ...(updateBinDto.warehouseId && {
        warehouseId: updateBinDto.warehouseId,
      }),
      ...(updateBinDto.description !== undefined && {
        description: updateBinDto.description,
      }),
      ...(updateBinDto.isActive !== undefined && {
        isActive: updateBinDto.isActive,
      }),
    };

    return this.prisma.bin.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<Bin> {
    return this.prisma.bin.delete({
      where: { id },
      include: this.include,
    });
  }
}

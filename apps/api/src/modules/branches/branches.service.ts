import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import type { Branch, Prisma } from '@prisma/client';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    warehouses: true,
    orders: true,
  } as const;

  create(createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.prisma.branch.create({
      data: {
        branchName: createBranchDto.name,
        branchCode: createBranchDto.code,
        address: createBranchDto.address,
        isActive: createBranchDto.isActive ?? true,
      },
      include: this.include,
    });
  }

  findAll(): Promise<Branch[]> {
    return this.prisma.branch.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<Branch | null> {
    return this.prisma.branch.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const updateData = {
      ...(updateBranchDto.name && { branchName: updateBranchDto.name }),
      ...(updateBranchDto.code && { branchCode: updateBranchDto.code }),
      ...(updateBranchDto.address !== undefined && {
        address: updateBranchDto.address,
      }),
      ...(updateBranchDto.isActive !== undefined && {
        isActive: updateBranchDto.isActive,
      }),
    };

    return this.prisma.branch.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<Branch> {
    return this.prisma.branch.delete({
      where: { id },
      include: this.include,
    });
  }
}

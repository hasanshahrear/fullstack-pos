import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReturnDto } from './dto/create-return.dto';
import type { Prisma, Return } from '@prisma/client';

@Injectable()
export class ReturnsService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    order: {
      include: {
        customer: true,
        branch: true,
        orderItems: {
          include: {
            product: true,
            productVariant: true,
          },
        },
      },
    },
  } as const;

  create(createReturnDto: CreateReturnDto): Promise<Return> {
    return this.prisma.return.create({
      data: createReturnDto,
      include: this.include,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReturnWhereUniqueInput;
    where?: Prisma.ReturnWhereInput;
    orderBy?: Prisma.ReturnOrderByWithRelationInput;
  }): Promise<Return[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.return.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    });
  }

  findOne(where: Prisma.ReturnWhereUniqueInput): Promise<Return | null> {
    return this.prisma.return.findUnique({
      where,
      include: this.include,
    });
  }

  update(params: {
    where: Prisma.ReturnWhereUniqueInput;
    data: Prisma.ReturnUpdateInput;
  }): Promise<Return> {
    const { where, data } = params;
    return this.prisma.return.update({
      data,
      where,
      include: this.include,
    });
  }

  remove(where: Prisma.ReturnWhereUniqueInput): Promise<Return> {
    return this.prisma.return.delete({
      where,
      include: this.include,
    });
  }

  findByOrder(orderId: number): Promise<Return | null> {
    return this.prisma.return.findUnique({
      where: { orderId },
      include: this.include,
    });
  }

  updateProcessingStatus(id: number, processed: boolean): Promise<Return> {
    return this.prisma.return.update({
      where: { id },
      data: { processed },
      include: this.include,
    });
  }

  findUnprocessed(): Promise<Return[]> {
    return this.prisma.return.findMany({
      where: { processed: false },
      include: this.include,
    });
  }
}

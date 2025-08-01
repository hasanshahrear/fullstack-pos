import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import type { Payment, Prisma } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.prisma.payment.create({
      data: createPaymentDto,
      include: {
        order: true,
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PaymentWhereUniqueInput;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput;
  }): Promise<Payment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.payment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        order: true,
      },
    });
  }

  findOne(where: Prisma.PaymentWhereUniqueInput): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where,
      include: {
        order: true,
      },
    });
  }

  update(params: {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.PaymentUpdateInput;
  }): Promise<Payment> {
    const { where, data } = params;
    return this.prisma.payment.update({
      data,
      where,
      include: {
        order: true,
      },
    });
  }

  remove(where: Prisma.PaymentWhereUniqueInput): Promise<Payment> {
    return this.prisma.payment.delete({
      where,
      include: {
        order: true,
      },
    });
  }

  findByOrder(orderId: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        orderId,
      },
      include: {
        order: true,
      },
    });
  }

  findByTransactionId(transactionId: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: {
        transactionId,
      },
      include: {
        order: true,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    customer: true,
    branch: true,
    tax: true,
    coupon: true,
    orderItems: {
      include: {
        product: true,
        productVariant: true,
        warehouse: true,
        tax: true,
        coupon: true,
      },
    },
    payments: true,
    Return: true,
  } as const;

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        orderNumber: createOrderDto.orderNumber,
        customerId: createOrderDto.customerId,
        branchId: createOrderDto.branchId,
        totalAmount: createOrderDto.totalAmount,
        taxId: createOrderDto.taxId,
        couponId: createOrderDto.couponId,
        status: createOrderDto.status,
        orderItems: {
          create: createOrderDto.orderItems,
        },
      },
      include: this.include,
    });
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: this.include,
    });
  }

  findByOrderNumber(orderNumber: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { orderNumber },
      include: this.include,
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updateData: Prisma.OrderUpdateInput = {
      ...(updateOrderDto.orderNumber && {
        orderNumber: updateOrderDto.orderNumber,
      }),
      ...(updateOrderDto.customerId && {
        customerId: updateOrderDto.customerId,
      }),
      ...(updateOrderDto.branchId && { branchId: updateOrderDto.branchId }),
      ...(updateOrderDto.totalAmount && {
        totalAmount: updateOrderDto.totalAmount,
      }),
      ...(updateOrderDto.taxId && { taxId: updateOrderDto.taxId }),
      ...(updateOrderDto.couponId && { couponId: updateOrderDto.couponId }),
      ...(updateOrderDto.status && { status: updateOrderDto.status }),
    };

    // Update order items if provided
    if (updateOrderDto.orderItems) {
      updateData.orderItems = {
        deleteMany: {}, // Remove existing items
        create: updateOrderDto.orderItems, // Create new items
      };
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
      include: this.include,
    });
  }

  async updateStatus(id: number, status: Order['status']): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: this.include,
    });
  }

  findByCustomer(customerId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { customerId },
      include: this.include,
    });
  }

  findByBranch(branchId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { branchId },
      include: this.include,
    });
  }
}

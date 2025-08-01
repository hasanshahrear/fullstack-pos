import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import type { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    orders: true,
  } as const;

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({
      data: {
        customerName: createCustomerDto.name,
        email: createCustomerDto.email,
        phone: createCustomerDto.phone,
        isActive: createCustomerDto.isActive ?? true,
        loyaltyPoints: 0,
      },
      include: this.include,
    });
  }

  findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      include: this.include,
    });
  }

  findOne(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id },
      include: this.include,
    });
  }

  findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { email },
      include: this.include,
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const updateData = {
      ...(updateCustomerDto.name && { customerName: updateCustomerDto.name }),
      ...(updateCustomerDto.email && { email: updateCustomerDto.email }),
      ...(updateCustomerDto.phone && { phone: updateCustomerDto.phone }),
      ...(updateCustomerDto.isActive !== undefined && {
        isActive: updateCustomerDto.isActive,
      }),
    };

    return this.prisma.customer.update({
      where: { id },
      data: updateData,
      include: this.include,
    });
  }

  remove(id: number): Promise<Customer> {
    return this.prisma.customer.delete({
      where: { id },
      include: this.include,
    });
  }

  async updateLoyaltyPoints(id: number, points: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: { loyaltyPoints: true },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.prisma.customer.update({
      where: { id },
      data: {
        loyaltyPoints: customer.loyaltyPoints + points,
      },
      include: this.include,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { variants, ...productData } = createProductDto;
    const product = await this.prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
      include: {
        variants: true,
        category: true,
        brand: true,
        salesUnit: true,
        tax: true,
      },
    });
    return product;
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        variants: true,
        category: true,
        brand: true,
        salesUnit: true,
        tax: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        category: true,
        brand: true,
        salesUnit: true,
        tax: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { variants, ...productData } = updateProductDto;
    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        variants: {
          upsert: variants?.map((variant) => ({
            where: { id: variant.id || 0 },
            create: variant,
            update: variant,
          })),
        },
      },
      include: {
        variants: true,
        category: true,
        brand: true,
        salesUnit: true,
        tax: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  addVariant(productId: number, createVariantDto: CreateProductVariantDto) {
    return this.prisma.productVariant.create({
      data: {
        ...createVariantDto,
        productId,
      },
    });
  }
}

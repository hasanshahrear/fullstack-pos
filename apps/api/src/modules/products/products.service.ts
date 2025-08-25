import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { HttpResponseException } from 'src/utils/exceptions';
import { HttpResponseService } from '../http-response/http-response.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private httpResponseService: HttpResponseService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
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
      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        product,
        'Product created successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          variants: true,
          category: true,
          brand: true,
          salesUnit: true,
          tax: true,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        products,
        'Products retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          variants: true,
          category: true,
          brand: true,
          salesUnit: true,
          tax: true,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        product,
        'Product retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const { variants, ...productData } = updateProductDto;
      const updateProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...productData,
          variants: {
            upsert: variants?.map((variant) => ({
              where: { id: Number(variant?.id) || 0 },
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

      return this.httpResponseService.generate(
        HttpStatus.OK,
        updateProduct,
        'Product updated successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'Product deleted successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async addVariant(
    productId: number,
    createVariantDto: CreateProductVariantDto,
  ) {
    try {
      const variant = await this.prisma.productVariant.create({
        data: {
          ...createVariantDto,
          productId,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        variant,
        'Product variant added successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }
}

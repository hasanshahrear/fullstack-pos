import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductVariantOptionDto } from './dto/create-product-variant-option.dto';
import { UpdateProductVariantOptionDto } from './dto/update-product-variant-option.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpResponseService } from '../http-response/http-response.service';
import { HttpResponseException } from 'src/utils/exceptions';

@Injectable()
export class ProductVariantOptionsService {
  constructor(
    private prisma: PrismaService,
    private httpResponseService: HttpResponseService,
  ) {}

  async create(createProductVariantOptionDto: CreateProductVariantOptionDto) {
    try {
      const productVariantOption =
        await this.prisma.productVariantOption.create({
          data: createProductVariantOptionDto,
        });

      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        productVariantOption,
        'Product variant option created successfully',
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
      const productVariantOptions =
        await this.prisma.productVariantOption.findMany();

      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOptions,
        'Product variant option retrieved successfully',
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
      const productVariantOption =
        await this.prisma.productVariantOption.findUnique({
          where: { id },
        });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOption,
        'Product variant option retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async update(
    id: number,
    updateProductVariantOptionDto: UpdateProductVariantOptionDto,
  ) {
    try {
      const productVariantOption =
        await this.prisma.productVariantOption.update({
          where: { id },
          data: updateProductVariantOptionDto,
        });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOption,
        'Product variant option updated successfully',
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
      await this.prisma.productVariantOption.delete({ where: { id } });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'Product variant option deleted successfully',
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

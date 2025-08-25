import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductVariantOptionValueDto } from './dto/create-product-variant-option-value.dto';
import { UpdateProductVariantOptionValueDto } from './dto/update-product-variant-option-value.dto';
import { HttpResponseService } from '../http-response/http-response.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpResponseException } from 'src/utils/exceptions';

@Injectable()
export class ProductVariantOptionValuesService {
  constructor(
    private readonly httpResponseService: HttpResponseService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    createProductVariantOptionValueDto: CreateProductVariantOptionValueDto,
  ) {
    try {
      const productVariantOptionValue =
        await this.prismaService.productVariantOptionValue.create({
          data: createProductVariantOptionValueDto,
        });

      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        productVariantOptionValue,
        'Product variant option value created successfully',
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
      const productVariantOptionValues =
        await this.prismaService.productVariantOptionValue.findMany();

      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOptionValues,
        'Product variant option values retrieved successfully',
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
      const productVariantOptionValue =
        await this.prismaService.productVariantOptionValue.findUnique({
          where: { id },
          include: {
            variantOption: true,
          },
        });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOptionValue,
        'Product variant option value retrieved successfully',
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
    updateProductVariantOptionValueDto: UpdateProductVariantOptionValueDto,
  ) {
    try {
      const productVariantOptionValue =
        await this.prismaService.productVariantOptionValue.update({
          where: { id },
          data: updateProductVariantOptionValueDto,
        });
      return this.httpResponseService.generate(
        HttpStatus.OK,
        productVariantOptionValue,
        'Product variant option value updated successfully',
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
      await this.prismaService.productVariantOptionValue.delete({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'Product variant option value deleted successfully',
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

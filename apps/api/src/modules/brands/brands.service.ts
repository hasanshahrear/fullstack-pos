import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { HttpResponseService } from '../http-response/http-response.service';
import { HttpResponseException } from 'src/utils/exceptions';

@Injectable()
export class BrandsService {
  constructor(
    private prisma: PrismaService,
    private httpResponseService: HttpResponseService,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      await this.prisma.brand.create({
        data: createBrandDto,
      });

      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        null,
        'Brand create successfully',
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
      const brands = await this.prisma.brand.findMany();

      return this.httpResponseService.generate(
        HttpStatus.OK,
        brands,
        'Brands retrieved successfully',
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
      const brand = await this.prisma.brand.findUnique({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        brand,
        'Brand retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        brand,
        'Brand update successfully',
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
      await this.prisma.brand.delete({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'Brand deleted successfully',
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

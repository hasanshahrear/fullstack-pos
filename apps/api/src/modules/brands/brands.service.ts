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
        'Brand created successfully',
      );
    } catch (errors: unknown) {
      throw new HttpResponseException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Brand code already found',
        errors,
      });
    }
  }

  findAll() {
    return this.prisma.brand.findMany();
  }

  findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  remove(id: number) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}

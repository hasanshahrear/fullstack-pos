import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { HttpResponseException } from 'src/utils/exceptions';
import { HttpResponseService } from '../http-response/http-response.service';

@Injectable()
export class UnitsService {
  constructor(
    private prisma: PrismaService,
    private httpResponseService: HttpResponseService,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    try {
      await this.prisma.unit.create({
        data: createUnitDto,
      });

      this.httpResponseService.generate(
        HttpStatus.CREATED,
        null,
        'Unit created successfully',
      );
    } catch (errors: unknown) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create unit',
        errors,
      });
    }
  }

  findAll() {
    return this.prisma.unit.findMany({
      include: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.unit.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
      include: {
        products: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.unit.delete({
      where: { id },
    });
  }
}

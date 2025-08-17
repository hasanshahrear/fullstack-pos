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
      const unit = await this.prisma.unit.create({
        data: createUnitDto,
      });

      return this.httpResponseService.generate(
        HttpStatus.CREATED,
        unit,
        'Unit created successfully',
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
      const units = await this.prisma.unit.findMany();

      return this.httpResponseService.generate(
        HttpStatus.OK,
        units,
        'Units retrieved successfully',
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
      const unit = await this.prisma.unit.findUnique({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        unit,
        'Unit retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    try {
      const unit = await this.prisma.unit.update({
        where: { id },
        data: updateUnitDto,
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        unit,
        'Unit updated successfully',
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
      await this.prisma.unit.delete({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'Unit deleted successfully',
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

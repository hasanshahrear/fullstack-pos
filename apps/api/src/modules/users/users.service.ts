import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { HttpResponseService } from '../http-response/http-response.service';
import { HttpResponseException } from 'src/utils/exceptions';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private httpResponseService: HttpResponseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return this.httpResponseService.generate(HttpStatus.CREATED, user);
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
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        users,
        'Users retrieved successfully',
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
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        user,
        'User retrieved successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await hash(updateUserDto.password, 10);
      }
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        user,
        'User update successfully',
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
      await this.prisma.user.delete({
        where: { id },
      });

      return this.httpResponseService.generate(
        HttpStatus.OK,
        null,
        'User removed successfully',
      );
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

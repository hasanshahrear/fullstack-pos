import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';

@ApiTags('Returns')
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Get()
  findAll(
    @Query()
    params: {
      skip?: string;
      take?: string;
      cursor?: Prisma.ReturnWhereUniqueInput;
      where?: Prisma.ReturnWhereInput;
      orderBy?: Prisma.ReturnOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.returnsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  @Get('unprocessed')
  findUnprocessed() {
    return this.returnsService.findUnprocessed();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.findOne({ id });
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.returnsService.findByOrder(orderId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnDto: UpdateReturnDto,
  ) {
    return this.returnsService.update({
      where: { id },
      data: updateReturnDto,
    });
  }

  @Patch(':id/process')
  updateProcessingStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('processed') processed: boolean,
  ) {
    return this.returnsService.updateProcessingStatus(id, processed);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.remove({ id });
  }
}

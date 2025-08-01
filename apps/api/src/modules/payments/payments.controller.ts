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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll(
    @Query()
    params: {
      skip?: string;
      take?: string;
      cursor?: Prisma.PaymentWhereUniqueInput;
      where?: Prisma.PaymentWhereInput;
      orderBy?: Prisma.PaymentOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.paymentsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findOne({ id });
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentsService.findByOrder(orderId);
  }

  @Get('transaction/:transactionId')
  findByTransactionId(@Param('transactionId') transactionId: string) {
    return this.paymentsService.findByTransactionId(transactionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove({ id });
  }
}

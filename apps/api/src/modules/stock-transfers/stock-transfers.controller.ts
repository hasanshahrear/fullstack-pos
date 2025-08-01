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
import { StockTransfersService } from './stock-transfers.service';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';

@ApiTags('Stock Transfers')
@Controller('stock-transfers')
export class StockTransfersController {
  constructor(private readonly stockTransfersService: StockTransfersService) {}

  @Post()
  create(@Body() createStockTransferDto: CreateStockTransferDto) {
    return this.stockTransfersService.create(createStockTransferDto);
  }

  @Get()
  findAll(
    @Query()
    params: {
      skip?: string;
      take?: string;
      cursor?: Prisma.StockTransferWhereUniqueInput;
      where?: Prisma.StockTransferWhereInput;
      orderBy?: Prisma.StockTransferOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.stockTransfersService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockTransfersService.findOne({ id });
  }

  @Get('number/:transferNumber')
  findByTransferNumber(@Param('transferNumber') transferNumber: string) {
    return this.stockTransfersService.findByTransferNumber(transferNumber);
  }

  @Get('warehouse/:warehouseId')
  findByWarehouse(@Param('warehouseId', ParseIntPipe) warehouseId: number) {
    return this.stockTransfersService.findByWarehouse(warehouseId);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.stockTransfersService.findByProduct(productId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockTransferDto: UpdateStockTransferDto,
  ) {
    return this.stockTransfersService.update({
      where: { id },
      data: updateStockTransferDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockTransfersService.remove({ id });
  }
}

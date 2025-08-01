import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BinInventoriesService } from './bin-inventories.service';
import { CreateBinInventoryDto } from './dto/create-bin-inventory.dto';
import { UpdateBinInventoryDto } from './dto/update-bin-inventory.dto';

@Controller('bin-inventories')
export class BinInventoriesController {
  constructor(private readonly binInventoriesService: BinInventoriesService) {}

  @Post()
  create(@Body() createBinInventoryDto: CreateBinInventoryDto) {
    return this.binInventoriesService.create(createBinInventoryDto);
  }

  @Get()
  findAll() {
    return this.binInventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.binInventoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBinInventoryDto: UpdateBinInventoryDto,
  ) {
    return this.binInventoriesService.update(id, updateBinInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.binInventoriesService.remove(id);
  }
}

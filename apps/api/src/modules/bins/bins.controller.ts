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
import { BinsService } from './bins.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  create(@Body() createBinDto: CreateBinDto) {
    return this.binsService.create(createBinDto);
  }

  @Get()
  findAll() {
    return this.binsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.binsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBinDto: UpdateBinDto,
  ) {
    return this.binsService.update(id, updateBinDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.binsService.remove(id);
  }
}

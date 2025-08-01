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
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';

@ApiTags('Activity Logs')
@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  @Get()
  findAll(
    @Query()
    params: {
      skip?: string;
      take?: string;
      cursor?: Prisma.ActivityLogWhereUniqueInput;
      where?: Prisma.ActivityLogWhereInput;
      orderBy?: Prisma.ActivityLogOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.activityLogsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogsService.findOne({ id });
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.activityLogsService.findByUser(userId);
  }

  @Get('action/:action')
  findByAction(@Param('action') action: string) {
    return this.activityLogsService.findByAction(action);
  }

  @Get('target/:target')
  findByTarget(@Param('target') target: string) {
    return this.activityLogsService.findByTarget(target);
  }

  @Get('date-range')
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.activityLogsService.findByDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityLogDto: UpdateActivityLogDto,
  ) {
    return this.activityLogsService.update({
      where: { id },
      data: updateActivityLogDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogsService.remove({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import type { ActivityLog, Prisma } from '@prisma/client';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    user: true,
  } as const;

  create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    return this.prisma.activityLog.create({
      data: createActivityLogDto,
      include: this.include,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityLogWhereUniqueInput;
    where?: Prisma.ActivityLogWhereInput;
    orderBy?: Prisma.ActivityLogOrderByWithRelationInput;
  }): Promise<ActivityLog[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.activityLog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    });
  }

  findOne(
    where: Prisma.ActivityLogWhereUniqueInput,
  ): Promise<ActivityLog | null> {
    return this.prisma.activityLog.findUnique({
      where,
      include: this.include,
    });
  }

  update(params: {
    where: Prisma.ActivityLogWhereUniqueInput;
    data: Prisma.ActivityLogUpdateInput;
  }): Promise<ActivityLog> {
    const { where, data } = params;
    return this.prisma.activityLog.update({
      data,
      where,
      include: this.include,
    });
  }

  remove(where: Prisma.ActivityLogWhereUniqueInput): Promise<ActivityLog> {
    return this.prisma.activityLog.delete({
      where,
      include: this.include,
    });
  }

  findByUser(userId: number): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: { userId },
      include: this.include,
    });
  }

  findByAction(action: string): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: { action },
      include: this.include,
    });
  }

  findByTarget(target: string): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: { target },
      include: this.include,
    });
  }

  findByDateRange(startDate: Date, endDate: Date): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: this.include,
    });
  }
}

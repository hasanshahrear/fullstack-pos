import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityLogsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = { user: true } as const;

  async create(createActivityLogDto: CreateActivityLogDto): Promise<any> {
    const result = await this.prisma.activityLog.create({
      data: createActivityLogDto as Prisma.ActivityLogCreateInput,
      include: this.include,
    });
    return result;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityLogWhereUniqueInput;
    where?: Prisma.ActivityLogWhereInput;
    orderBy?: Prisma.ActivityLogOrderByWithRelationInput;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const results = await this.prisma.activityLog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    });
    return results;
  }

  async findOne(where: Prisma.ActivityLogWhereUniqueInput): Promise<any> {
    const result = await this.prisma.activityLog.findUnique({
      where,
      include: this.include,
    });
    return result;
  }

  async update(params: {
    where: Prisma.ActivityLogWhereUniqueInput;
    data: Prisma.ActivityLogUpdateInput;
  }): Promise<any> {
    const { where, data } = params;
    const result = await this.prisma.activityLog.update({
      data,
      where,
      include: this.include,
    });
    return result;
  }

  async remove(where: Prisma.ActivityLogWhereUniqueInput): Promise<any> {
    const result = await this.prisma.activityLog.delete({
      where,
      include: this.include,
    });
    return result;
  }

  async findByUser(userId: number): Promise<any[]> {
    const results = await this.prisma.activityLog.findMany({
      where: { userId },
      include: this.include,
    });
    return results;
  }

  async findByAction(action: string): Promise<any[]> {
    const results = await this.prisma.activityLog.findMany({
      where: { action },
      include: this.include,
    });
    return results;
  }

  async findByTarget(target: string): Promise<any[]> {
    const results = await this.prisma.activityLog.findMany({
      where: { target },
      include: this.include,
    });
    return results;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<any[]> {
    const results = await this.prisma.activityLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: this.include,
    });
    return results;
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MaplePointService } from './maple-point.service';
import { GetUser } from '../lib/decorators';
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/guards';

@Controller('api/point')
export class MaplePointController {
  constructor(private readonly maplePointService: MaplePointService) {}

  @UseGuards(AuthGuard)
  @Get('/history')
  async getMaplePointHistory(
    @Query('pageNumber') pageNumber: number,
    @Query('showCount') showCount: number,
    @Query('target') target: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @GetUser() user: User,
  ) {
    return await this.maplePointService.getMaplePointHistory(
      user.id,
      pageNumber,
      showCount,
      target,
      startDate,
      endDate,
    );
  }
}

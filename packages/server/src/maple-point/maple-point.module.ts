import { Module } from '@nestjs/common';
import { MaplePointController } from './maple-point.controller';
import { MaplePointService } from './maple-point.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MaplePointController],
  providers: [MaplePointService, PrismaService],
  exports: [MaplePointService],
})
export class MaplePointModule {}

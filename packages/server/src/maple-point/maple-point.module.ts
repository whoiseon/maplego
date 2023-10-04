import { Module } from '@nestjs/common';
import { MaplePointController } from './maple-point.controller';
import { MaplePointService } from './maple-point.service';
import { PrismaService } from '../prisma/prisma.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  controllers: [MaplePointController],
  providers: [PrismaService, ...authProviders],
  exports: [MaplePointService],
})
export class MaplePointModule {}

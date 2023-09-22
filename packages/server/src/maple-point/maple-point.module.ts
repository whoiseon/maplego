import { Module } from '@nestjs/common';
import { MaplePointController } from './maple-point.controller';
import { MaplePointService } from './maple-point.service';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [MaplePointController],
  providers: [
    MaplePointService,
    PrismaService,
    TokenService,
    JwtService,
    AuthService,
    MaplePointService,
  ],
  exports: [MaplePointService],
})
export class MaplePointModule {}

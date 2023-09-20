import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CookieService } from 'src/cookie/cookie.service';
import { MaplePointService } from '../maple-point/maple-point.service';

@Module({
  controllers: [MeController],
  providers: [
    MeService,
    PrismaService,
    TokenService,
    JwtService,
    AuthService,
    CookieService,
    MaplePointService,
  ],
})
export class MeModule {}

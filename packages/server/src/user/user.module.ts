import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { MaplePointService } from '../maple-point/maple-point.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    TokenService,
    JwtService,
    AuthService,
    MaplePointService,
  ],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CookieService } from 'src/cookie/cookie.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TokenService, CookieService],
  exports: [AuthService],
})
export class AuthModule {}

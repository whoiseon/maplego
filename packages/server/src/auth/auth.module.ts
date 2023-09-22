import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from 'src/cookie/cookie.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [PrismaService, ...authProviders, CookieService],
  exports: [AuthService],
})
export class AuthModule {}

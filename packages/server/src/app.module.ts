import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { CookieModule } from './cookie/cookie.module';
import { MeModule } from './me/me.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { MaplePointService } from './maple-point/maple-point.service';
import { MaplePointModule } from './maple-point/maple-point.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TokenModule,
    CookieModule,
    MeModule,
    MaplePointModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MaplePointService,
  ],
})
export class AppModule {}

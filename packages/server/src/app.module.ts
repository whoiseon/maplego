import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { CookieModule } from './cookie/cookie.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

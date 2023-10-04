import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CookieService } from 'src/cookie/cookie.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  controllers: [MeController],
  providers: [MeService, PrismaService, CookieService, ...authProviders],
})
export class MeModule {}

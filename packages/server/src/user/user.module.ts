import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ...authProviders],
  exports: [UserService],
})
export class UserModule {}

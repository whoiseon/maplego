import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EmailService } from '../email/email.service';

@Module({
  providers: [PrismaService, EmailService],
  exports: [PrismaService],
})
export class PrismaModule {}

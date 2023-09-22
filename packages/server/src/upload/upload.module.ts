import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma/prisma.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService, ...authProviders],
  exports: [UploadService],
})
export class UploadModule {}

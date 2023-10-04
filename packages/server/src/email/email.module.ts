import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { authProviders } from '../lib/providers/auth.providers';

@Module({
  providers: [EmailService, ...authProviders],
  exports: [EmailService],
})
export class EmailModule {}

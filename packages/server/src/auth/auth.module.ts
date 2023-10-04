import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from 'src/cookie/cookie.service';
import { authProviders } from '../lib/providers/auth.providers';
import { EmailService } from '../email/email.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [...authProviders, CookieService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}

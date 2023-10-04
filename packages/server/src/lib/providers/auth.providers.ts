import { TokenService } from '../../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { MaplePointService } from '../../maple-point/maple-point.service';
import { EmailService } from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';

export const authProviders = [
  PrismaService,
  TokenService,
  JwtService,
  AuthService,
  MaplePointService,
  EmailService,
];

import { TokenService } from '../../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { MaplePointService } from '../../maple-point/maple-point.service';

export const authProviders = [
  TokenService,
  JwtService,
  AuthService,
  MaplePointService,
];

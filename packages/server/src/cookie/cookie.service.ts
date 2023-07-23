import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Tokens } from 'src/auth/types';

@Injectable()
export class CookieService {
  public setTokenCookie(req: Request, tokens: Tokens) {
    req.res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });
    req.res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
  }

  public clearTokenCookie(req: Request) {
    req.res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
    });
    req.res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
    });
  }
}

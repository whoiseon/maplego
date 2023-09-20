import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/lib/constant';
import { TokenService } from 'src/token/token.service';
import { AppError } from 'src/lib/error';
import { AccessTokenPayload, Tokens } from 'src/token/types';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenService: TokenService,
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token.accessToken) {
      throw new AppError('Unauthorized', {
        isExpiredToken: false,
      });
    }

    try {
      const payload = await this.tokenService.validateToken<AccessTokenPayload>(
        token.accessToken,
      );

      request['user'] = {
        id: payload.userId,
        username: payload.username,
        displayName: payload.displayName,
      };
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        throw new AppError('Unauthorized', {
          isExpiredToken: true,
        });
      }

      throw new AppError('Unauthorized', {
        isExpiredToken: false,
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): Tokens {
    const { authorization } = request?.headers;
    const accessToken =
      request?.cookies['access_token'] || authorization?.split(' ')[1];
    const refreshToken = request?.cookies['refresh_token'];

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}

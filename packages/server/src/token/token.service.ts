import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload, Tokens } from 'src/token/types';
import { Token, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  private readonly JWT_TOKEN_SECRET: string =
    this.configService.get<string>('JWT_TOKEN_SECRET');

  private readonly tokenDuration = {
    access_token: '5s',
    refresh_token: '7d',
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly db: PrismaService,
  ) {}

  public async generateToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.JWT_TOKEN_SECRET,
      expiresIn: this.tokenDuration[payload.type],
    });
  }

  public async validateToken<T>(token: string): Promise<T> {
    return (await this.jwtService.verifyAsync(token, {
      secret: this.JWT_TOKEN_SECRET,
    })) as T;
  }

  public async generateTokens(user: User, tokenItem?: Token): Promise<Tokens> {
    const { id: userId, username } = user;
    const token = tokenItem ?? (await this.createTokenItem(userId));
    const tokenId = token.id;

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
        displayName: user.displayName,
        level: user.level,
      }),
      this.generateToken({
        type: 'refresh_token',
        tokenId: tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createTokenItem(userId: number): Promise<Token> {
    const token = await this.db.token.create({
      data: {
        userId,
      },
    });

    return token;
  }
}

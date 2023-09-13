import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DecodedToken, TokenPayload, Tokens } from 'src/token/types';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  private readonly SALT_ROUNDS: number = 10;

  private readonly JWT_TOKEN_SECRET: string =
    this.configService.get<string>('JWT_TOKEN_SECRET');

  private readonly tokenDuration = {
    access_token: '1h',
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

  public async validateToken<T>(token: string): Promise<DecodedToken<T>> {
    return (await this.jwtService.verifyAsync(token, {
      secret: this.JWT_TOKEN_SECRET,
    })) as DecodedToken<T>;
  }

  public async generateTokens(user: User): Promise<Tokens> {
    const { id: userId, username, displayName, level, profileImage } = user;

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken({
        type: 'access_token',
        userId,
        username,
        displayName,
        level,
        profileImage,
      }),
      this.generateToken({
        type: 'refresh_token',
        userId,
      }),
    ]);

    await this.createTokenItem(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createTokenItem(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const hashedToken = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);

    return this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        currentHashedToken: hashedToken,
      },
    });
  }

  public async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}

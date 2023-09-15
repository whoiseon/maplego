import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AppError, isAppError } from 'src/lib/error';
import { SignInResponseType, SignUpResponseType } from 'src/auth/types';
import { SignInBodyDto } from 'src/auth/dto/sign-in-body.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { RefreshTokenPayload, Tokens } from 'src/token/types';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number = 10;
  private readonly JWT_SECRET: string = this.configService.get<string>(
    'JWT_ACCESS_TOKEN_SECRET',
  );

  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  public async signUp(
    signUpBodyDto: SignUpBodyDto,
  ): Promise<SignUpResponseType> {
    const { username, password, displayName } = signUpBodyDto;

    try {
      const existingUser: User = await this.db.user.findFirst({
        where: {
          OR: [{ username }, { displayName }],
        },
      });

      if (existingUser) {
        const isExistingUsername = username === existingUser.username;

        throw new AppError('AlreadyExists', {
          field: isExistingUsername ? 'username' : 'displayName',
        });
      }

      const hashedPassword: string = await bcrypt.hash(
        password,
        this.SALT_ROUNDS,
      );

      const user = await this.db.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
          displayName,
        },
      });

      return {
        registered: !!user,
      };
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async signIn(
    signInBodyDto: SignInBodyDto,
  ): Promise<SignInResponseType> {
    const { username, password } = signInBodyDto;

    try {
      const user: User = await this.db.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new AppError('WrongCredentials');
      }

      try {
        const isPasswordValid: boolean = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!isPasswordValid) throw new AppError('WrongCredentials');
      } catch (e) {
        if (isAppError(e)) {
          throw e;
        }

        throw new AppError('Unknown');
      }

      const tokens = await this.tokenService.generateTokens(user);

      await this.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      });

      return {
        user,
        tokens,
      };
    } catch (e) {
      console.error(e);
      throw new AppError('Unknown');
    }
  }

  public async signOut(user: User): Promise<void> {
    await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentHashedToken: null,
      },
    });
  }

  public async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const decodedToken =
        await this.tokenService.validateToken<RefreshTokenPayload>(token);

      const userId = decodedToken.userId;
      const user = await this.tokenService.getUserIfRefreshTokenMatches(
        token,
        userId,
      );

      if (!user) {
        throw new AppError('Unauthorized', {
          isExpiredToken: false,
        });
      }

      const accessToken = await this.tokenService.generateToken({
        type: 'access_token',
        userId: user.id,
        username: user.username,
        displayName: user.displayName,
        level: user.level,
        profileImage: user.profileImage,
      });

      return {
        accessToken,
      };
    } catch (e) {
      throw new AppError('RefreshFailure');
    }
  }

  // public async refreshToken(token: string): Promise<Tokens> {
  //   try {
  //     const { tokenId, rotationCounter } =
  //       await this.tokenService.validateToken<RefreshTokenPayload>(token);
  //     const tokenItem = await this.db.token.findUnique({
  //       where: {
  //         id: tokenId,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     });
  //
  //     if (!tokenItem) {
  //       throw new Error('Token not found');
  //     }
  //
  //     if (tokenItem.blocked) {
  //       throw new AppError('Unauthorized', {
  //         isExpiredToken: false,
  //       });
  //     }
  //
  //     if (tokenItem.rotationCounter !== rotationCounter) {
  //       await this.db.token.update({
  //         where: {
  //           id: tokenId,
  //         },
  //         data: {
  //           blocked: true,
  //         },
  //       });
  //
  //       throw new Error('Rotation counter does not match');
  //     }
  //
  //     tokenItem.rotationCounter += 1;
  //     await this.db.token.update({
  //       where: {
  //         id: tokenId,
  //       },
  //       data: {
  //         rotationCounter: tokenItem.rotationCounter,
  //       },
  //     });
  //
  //     const tokens = await this.tokenService.generateTokens(
  //       tokenItem.user,
  //       tokenItem,
  //     );
  //
  //     return tokens;
  //   } catch (e) {
  //     throw new AppError('RefreshFailure');
  //   }
  // }
}

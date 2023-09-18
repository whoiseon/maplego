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
import { RefreshTokenPayload } from 'src/token/types';
import { ChangePasswordBodyDto } from './dto/change-password-body.dto';
import { ChangePasswordResponseType } from './types/change-password-response.type';

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
      if (isAppError(e)) {
        throw e;
      }

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

  public async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordBodyDto,
  ): Promise<ChangePasswordResponseType> {
    const { currentPassword, newPassword } = changePasswordDto;

    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      const isPasswordValid: boolean = await bcrypt.compare(
        currentPassword,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        return {
          changed: false,
          payload: {
            field: 'currentPassword',
          },
        };
      }

      if (currentPassword === newPassword) {
        return {
          changed: false,
          payload: {
            field: 'newPassword',
          },
        };
      }

      const hashedPassword: string = await bcrypt.hash(
        newPassword,
        this.SALT_ROUNDS,
      );

      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          passwordHash: hashedPassword,
        },
      });

      return {
        changed: true,
        payload: null,
      };
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}

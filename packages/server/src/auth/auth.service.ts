import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AppError, appErrors } from 'src/lib/error';
import { SignInResponseType, SignUpResponseType } from 'src/auth/types';
import { SignInBodyDto } from 'src/auth/dto/sign-in-body.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { RefreshTokenPayload } from 'src/token/types';
import { ChangePasswordBodyDto } from './dto/change-password-body.dto';
import { ChangePasswordResponseType } from './types/change-password-response.type';
import AppResponse from '../lib/app.response';
import { MaplePointService } from '../maple-point/maple-point.service';
import { SendMailDto } from './dto/send-mail.dto';
import { EmailService } from '../email/email.service';
import { createAuthEmail } from '../etc/emailTemplates';
import { VerifyMailDto } from './dto/verify-mail.dto';

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
    private readonly maplePointService: MaplePointService,
    private readonly emailService: EmailService,
  ) {}

  public async sendMail(
    sendMailDto: SendMailDto,
  ): Promise<AppResponse<string>> {
    const { email } = sendMailDto;
    const code = this.emailService.createRandomCode();

    try {
      const existingUser: User = await this.db.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return new AppResponse({
          name: appErrors.emailAlreadyExists.name,
          statusCode: appErrors.emailAlreadyExists.statusCode,
          message: appErrors.emailAlreadyExists.message,
          payload: null,
        });
      }

      await this.db.emailAuth.create({
        data: {
          email,
          code: code.toString(),
        },
      });

      await this.emailService.sendMail({
        to: email,
        ...createAuthEmail(code),
        from: 'verify@maplego.me',
      });

      return new AppResponse('success');
    } catch (e) {
      console.error(e);
      return new AppResponse('unknown');
    }
  }

  public async verifyMail(params: VerifyMailDto): Promise<AppResponse<any>> {
    const { email, code } = params;
    try {
      const emailAuth = await this.db.emailAuth.findFirst({
        where: {
          email,
          code,
        },
      });

      if (!emailAuth) {
        return new AppResponse({
          name: appErrors.wrongCode.name,
          statusCode: appErrors.wrongCode.statusCode,
          message: appErrors.wrongCode.message,
          payload: null,
        });
      }

      // 생성된 날짜로부터 3분이 지났는지 확인
      const now = new Date();
      const createdAt = emailAuth.createdAt;
      const diff = now.getTime() - createdAt.getTime();
      const diffMinutes = Math.floor(diff / 1000 / 60);

      if (diffMinutes > 3) {
        return new AppResponse({
          name: appErrors.expiredCode.name,
          statusCode: appErrors.expiredCode.statusCode,
          message: appErrors.expiredCode.message,
          payload: null,
        });
      }

      await this.db.emailAuth.delete({
        where: {
          id: emailAuth.id,
        },
      });

      return new AppResponse('success');
    } catch (e) {
      console.error(e);
      return new AppResponse('unknown');
    }
  }

  public async signUp(
    signUpBodyDto: SignUpBodyDto,
  ): Promise<AppResponse<SignUpResponseType>> {
    const { username, password, displayName, email } = signUpBodyDto;

    try {
      const existingUser: User = await this.db.user.findFirst({
        where: {
          OR: [{ username }, { displayName }],
        },
      });

      if (existingUser) {
        return new AppResponse({
          name: appErrors.usernameAlreadyExists.name,
          statusCode: appErrors.usernameAlreadyExists.statusCode,
          message: appErrors.usernameAlreadyExists.message,
          payload: null,
        });
      }

      const hashedPassword: string = await bcrypt.hash(
        password,
        this.SALT_ROUNDS,
      );

      const createdUser = await this.db.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
          displayName,
          email,
        },
      });

      await this.maplePointService.signUpPointEvent(createdUser.id);

      return new AppResponse('success');
    } catch (e) {
      return new AppResponse('unknown');
    }
  }

  public async signIn(
    signInBodyDto: SignInBodyDto,
  ): Promise<AppResponse<SignInResponseType>> {
    const { username, password } = signInBodyDto;

    try {
      const user: User = await this.db.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return new AppResponse({
          name: appErrors.wrongCredentials.name,
          statusCode: appErrors.wrongCredentials.statusCode,
          message: appErrors.wrongCredentials.message,
          payload: null,
        });
      }

      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        return new AppResponse({
          name: appErrors.wrongCredentials.name,
          statusCode: appErrors.wrongCredentials.statusCode,
          message: appErrors.wrongCredentials.message,
          payload: null,
        });
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

      return new AppResponse({
        name: '',
        statusCode: 200,
        message: '',
        payload: {
          user,
          tokens,
        },
      });
    } catch (e) {
      return new AppResponse('unknown');
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

  public async refreshToken(
    token: string,
  ): Promise<AppResponse<{ accessToken: string }>> {
    try {
      const decodedToken =
        await this.tokenService.validateToken<RefreshTokenPayload>(token);

      const userId = decodedToken.userId;
      const user = await this.tokenService.getUserIfRefreshTokenMatches(
        token,
        userId,
      );

      if (!user) {
        return new AppResponse({
          name: 'Unauthorized',
          statusCode: 401,
          message: 'user not found',
          payload: null,
        });
      }

      const accessToken = await this.tokenService.generateToken({
        type: 'access_token',
        userId: user.id,
        username: user.username,
        displayName: user.displayName,
      });

      return new AppResponse({
        name: '',
        statusCode: 200,
        message: '',
        payload: {
          accessToken,
        },
      });
    } catch (e) {
      throw new AppError('RefreshFailure');
    }
  }

  public async existDisplayName(
    displayName: string,
  ): Promise<AppResponse<null>> {
    try {
      const existUser = await this.db.user.findFirst({
        where: {
          displayName,
        },
      });

      if (existUser) {
        return new AppResponse({
          name: 'DisplayNameAlreadyExists',
          statusCode: 409,
          message: 'display name already exists',
          payload: null,
        });
      }

      return new AppResponse({
        name: '',
        statusCode: 200,
        message: '',
        payload: null,
      });
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordBodyDto,
  ): Promise<AppResponse<ChangePasswordResponseType>> {
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
        return new AppResponse({
          name: 'WrongCredentials',
          statusCode: 401,
          message: 'current password is wrong',
          payload: null,
        });
      }

      if (currentPassword === newPassword) {
        return new AppResponse({
          name: 'SamePassword',
          statusCode: 400,
          message: 'current password and new password are the same',
          payload: null,
        });
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
        name: '',
        statusCode: 200,
        message: '',
        payload: null,
      };
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}

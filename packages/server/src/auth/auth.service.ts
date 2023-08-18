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

@Injectable()
export class AuthService
{
  private readonly SALT_ROUNDS: number = 10;
  private readonly JWT_SECRET: string = this.configService.get<string>(
    'JWT_ACCESS_TOKEN_SECRET',
  );

  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) { }

  public async signUp(
    signUpBodyDto: SignUpBodyDto,
  ): Promise<SignUpResponseType>
  {
    const { username, password, displayName } = signUpBodyDto;

    const existingUser: User = await this.db.user.findFirst({
      where: {
        OR: [{ username }, { displayName }],
      },
    });

    if (existingUser)
    {
      const isExistingUsername = username === existingUser.username;

      throw new AppError('AlreadyExists', {
        field: isExistingUsername ? 'username' : 'displayName',
      });
    }

    const hashedPassword: string = await bcrypt.hash(
      password,
      this.SALT_ROUNDS,
    );

    await this.db.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        displayName,
      },
    });

    return {
      name: 'sign up success payload',
      statusCode: 0,
      message: '',
      payload: null,
    };
  }

  public async signIn(
    signInBodyDto: SignInBodyDto,
  ): Promise<SignInResponseType>
  {
    const { username, password } = signInBodyDto;

    const user: User = await this.db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
    {
      throw new AppError('WrongCredentials');
    }

    try
    {
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.passwordHash,
      );

      if (!isPasswordValid) throw new AppError('WrongCredentials');
    } catch (e)
    {
      if (isAppError(e))
      {
        throw e;
      }

      throw new AppError('Unknown');
    }

    const tokens = await this.tokenService.generateTokens(user);

    return {
      name: 'sign in success payload',
      statusCode: 0,
      message: '',
      payload: {
        user,
        tokens,
      },
    };
  }

  public async refreshToken(token: string)
  {
    try
    {
      const { tokenId, rotationCounter } =
        await this.tokenService.validateToken<RefreshTokenPayload>(token);
      const tokenItem = await this.db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      });

      if (!tokenItem)
      {
        throw new Error('Token not found');
      }

      if (tokenItem.blocked)
      {
        throw new Error('Token is blocked');
      }

      if (tokenItem.rotationCounter !== rotationCounter)
      {
        await this.db.token.update({
          where: {
            id: tokenId,
          },
          data: {
            blocked: true,
          },
        });

        throw new Error('Rotation counter does not match');
      }

      tokenItem.rotationCounter += 1;
      await this.db.token.update({
        where: {
          id: tokenId,
        },
        data: {
          rotationCounter: tokenItem.rotationCounter,
        },
      });

      const tokens = await this.tokenService.generateTokens(
        tokenItem.user,
        tokenItem,
      );

      return tokens;
    } catch (e)
    {
      throw new AppError('RefreshFailure');
    }
  }
}

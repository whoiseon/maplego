import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AppError } from 'src/lib/error/app-error';
import { SignUpResponseType } from 'src/auth/types';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number = 10;

  constructor(private readonly db: PrismaService) {}

  public async signUp(
    signUpBodyDto: SignUpBodyDto,
  ): Promise<SignUpResponseType> {
    const { username, password, displayName } = signUpBodyDto;

    const existingUser: User = await this.db.user.findFirst({
      where: {
        OR: [{ username }, { displayName }],
      },
    });

    if (existingUser) {
      const isExistingUsername = username === existingUser.username;

      if (isExistingUsername) {
        throw new AppError('UsernameExists');
      } else {
        throw new AppError('DisplayNameExists');
      }
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
      statusCode: HttpStatus.CREATED,
      message: 'Successfully signed up',
      payload: null,
    };
  }
}

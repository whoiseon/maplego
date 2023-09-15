import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AppError } from 'src/lib/error';

@Injectable()
export class MeService {
  constructor(private readonly db: PrismaService) {}

  public async getMeAll(user: User): Promise<User> {
    try {
      const { id: userId } = user;

      const userSelectField: Prisma.UserSelect = {
        id: true,
        username: true,
        displayName: true,
        profileImage: true,
        introduction: true,
        lastLogin: true,
        email: true,
        level: true,
        createdAt: true,
        updatedAt: true,
      };

      const userAll: User = await this.db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          ...userSelectField,
        },
      });

      return userAll;
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}

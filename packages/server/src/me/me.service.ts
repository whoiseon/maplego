import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AppError } from 'src/lib/error';
import { MaplePointService } from '../maple-point/maple-point.service';

@Injectable()
export class MeService {
  constructor(
    private readonly db: PrismaService,
    private readonly maplePointService: MaplePointService,
  ) {}

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
        mp: true,
      };

      const userAll = await this.db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          ...userSelectField,
        },
      });

      await this.maplePointService.signInCheckEvent(user.id);

      return userAll;
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}

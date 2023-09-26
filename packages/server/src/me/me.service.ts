import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AppError } from 'src/lib/error';
import { MaplePointService } from '../maple-point/maple-point.service';
import { MeResponseType } from './types/me-response.type';
import { formatDate } from '../lib/formatDate';

@Injectable()
export class MeService {
  constructor(
    private readonly db: PrismaService,
    private readonly maplePointService: MaplePointService,
  ) {}

  public async getMeAll(user: User): Promise<MeResponseType> {
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
        displayNameChangedAt: true,
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

      return {
        id: userAll.id,
        username: userAll.username,
        displayName: userAll.displayName,
        profileImage: userAll.profileImage,
        introduction: userAll.introduction,
        lastLogin: formatDate(userAll.lastLogin, 'large'),
        email: userAll.email,
        level: userAll.level,
        createdAt: formatDate(userAll.createdAt, 'large'),
        updatedAt: formatDate(userAll.updatedAt, 'large'),
        displayNameChangedAt: formatDate(userAll.displayNameChangedAt, 'large'),
        mp: userAll.mp,
      };
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}

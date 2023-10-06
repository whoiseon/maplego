import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppError } from '../lib/error';
import AppResponse from '../lib/app.response';
import { MaplePoint, Prisma } from '@prisma/client';
import { MaplePointHistoryResponse } from './types/point-history-response.type';

@Injectable()
export class MaplePointService {
  private logger = new Logger(MaplePointService.name);

  constructor(private readonly db: PrismaService) {}

  public async getMaplePoint(userId: number): Promise<number> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          mp: true,
        },
      });

      return user.mp;
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async getMaplePointHistory(
    userId: number,
    pageNumber: number,
    showCount: number,
    target: string,
    startDate: string,
    endDate: string,
  ): Promise<AppResponse<MaplePointHistoryResponse>> {
    try {
      const historySelectField: Prisma.MaplePointSelect = {
        id: true,
        point: true,
        prevPoint: true,
        message: true,
        createdAt: true,
      };

      const historyWhereField: Prisma.MaplePointWhereInput = {
        userId,
      };

      if (!!startDate && !!endDate) {
        historyWhereField.createdAt = {
          gte: this.formatStartDate(new Date(startDate)),
          lte: this.formatEndDate(new Date(endDate)),
        };
      }

      if (!!target && target === 'get') {
        historyWhereField.point = {
          gt: 0,
        };
      }

      if (!!target && target === 'use') {
        historyWhereField.point = {
          lt: 0,
        };
      }

      const history = await this.db.maplePoint.findMany({
        where: historyWhereField,
        select: historySelectField,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (pageNumber - 1) * showCount,
        take: showCount,
      });

      const historyCount = await this.db.maplePoint.count({
        where: {
          userId,
        },
      });

      return new AppResponse('Success', {
        showCount,
        pageNumber: 1,
        totalCount: historyCount,
        data: history,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async updateMaplePoint(
    userId: number,
    mp: number,
  ): Promise<AppResponse<any> | void> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return new AppResponse('NotFoundUser');
      }

      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          mp: user.mp + mp,
        },
      });
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async createMaplePointHistory(
    userId: number,
    mp: number,
    prevMp: number,
    message: string,
  ): Promise<AppResponse<any> | void> {
    try {
      const log = await this.db.maplePoint.create({
        data: {
          userId,
          point: mp,
          prevPoint: prevMp,
          message,
        },
      });

      if (!log) {
        return new AppResponse('Unknown');
      }
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async giveMaplePointByAdmin(
    userId: number,
    mp: number,
    message: string,
  ): Promise<AppResponse<null>> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return new AppResponse('NotFoundUser');
      }

      await this.updateMaplePoint(userId, mp);
      await this.createMaplePointHistory(userId, mp, user.mp, message);

      this.logger.log(
        `[MaplePoint-Give] (${userId} ${user.username})에게 ${mp}만큼의 메이플포인트를 지급하였습니다.`,
      );

      return new AppResponse('Success');
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async receiveMaplePointByAdmin(
    userId: number,
    mp: number,
    message: string,
  ): Promise<AppResponse<null>> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return new AppResponse('NotFoundUser');
      }

      if (user.mp < mp) {
        return new AppResponse('NotEnoughMaplePoint');
      }

      await this.updateMaplePoint(userId, mp);
      await this.createMaplePointHistory(userId, mp, user.mp, message);

      this.logger.log(
        `[MaplePoint-Receive] (${userId} ${user.username})에게 ${mp}만큼의 메이플포인트를 회수하였습니다.`,
      );

      return new AppResponse('Success');
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  private async getMaplePointHistoryAll(userId: number): Promise<MaplePoint[]> {
    try {
      return await this.db.maplePoint.findMany({
        where: {
          userId,
        },
      });
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  /** 로그인 출석체크 포인트 지급 이벤트 */
  public async signInCheckEvent(userId: number): Promise<boolean> {
    try {
      const history = await this.getMaplePointHistoryAll(userId);
      const today = new Date().getDate();
      const isAlreadyReceived = history.some(
        (item) => item.createdAt.getDate() === today,
      );

      if (isAlreadyReceived) {
        return false;
      }

      const minPoint = 1;
      const maxPoint = 100;
      const randomPoint = Math.floor(
        Math.random() * (maxPoint - minPoint + 1) + minPoint,
      );

      await this.giveMaplePointByAdmin(userId, randomPoint, '출석체크');

      return true;
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  /** 회원가입 포인트 지급 이벤트 */
  public async signUpPointEvent(userId: number): Promise<void> {
    try {
      await this.giveMaplePointByAdmin(userId, 1000, '신규가입 이벤트');
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  /** 유틸 */
  private formatStartDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private formatEndDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }
}

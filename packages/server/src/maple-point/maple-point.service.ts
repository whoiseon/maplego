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
  ): Promise<AppResponse<MaplePointHistoryResponse>> {
    try {
      const historySelectField: Prisma.MaplePointSelect = {
        id: true,
        point: true,
        message: true,
        createdAt: true,
      };

      const history = await this.db.maplePoint.findMany({
        where: {
          userId,
        },
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

      return new AppResponse({
        name: '',
        statusCode: 200,
        message: '',
        payload: {
          showCount: 10,
          pageNumber: 1,
          totalCount: historyCount,
          data: history,
        },
      });
    } catch (e) {
      throw new AppError('Unknown');
    }
  }

  public async updateMaplePoint(userId: number, mp: number): Promise<void> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new AppError('NotFound');
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
    message: string,
  ): Promise<void> {
    try {
      const log = await this.db.maplePoint.create({
        data: {
          userId,
          point: mp,
          message,
        },
      });

      if (!log) {
        throw new AppError('Unknown');
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
        return new AppResponse({
          name: 'NotFoundUser',
          statusCode: 404,
          message: 'user not found',
          payload: null,
        });
      }

      await this.updateMaplePoint(userId, mp);
      await this.createMaplePointHistory(userId, mp, message);

      this.logger.log(
        `[MaplePoint-Give] (${userId} ${user.username})에게 ${mp}만큼의 메이플포인트를 지급하였습니다.`,
      );

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
        return new AppResponse({
          name: 'NotFoundUser',
          statusCode: 404,
          message: 'user not found',
          payload: null,
        });
      }

      if (user.mp < mp) {
        return new AppResponse({
          name: 'NotEnoughMaplePoint',
          statusCode: 400,
          message: 'not enough maple point',
          payload: null,
        });
      }

      await this.updateMaplePoint(userId, mp);
      await this.createMaplePointHistory(userId, mp, message);

      this.logger.log(
        `[MaplePoint-Receive] (${userId} ${user.username})에게 ${mp}만큼의 메이플포인트를 회수하였습니다.`,
      );

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
  public async loginCheckEvent(userId: number): Promise<boolean> {
    try {
      const history = await this.getMaplePointHistoryAll(userId);
      const today = new Date().getDate();
      const isAlreadyReceived = history.some(
        (item) => item.createdAt.getDate() === today,
      );

      if (isAlreadyReceived) {
        return false;
      }

      const minPoint = 10;
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
}

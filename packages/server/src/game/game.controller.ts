import { Controller, Get, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';
import AppResponse from '../lib/app.response';
import { Public } from '../lib/decorators';
import {
  GameEvent,
  GameEventView,
  GameNoticeView,
  GameUpdateNews,
  GameUpdateNewsView,
} from './types';
import { GameUpdateNewsResponse } from './types/game-update-news-response.type';
import { GameNoticeResponse } from './types/game-notice-response.type';

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Public()
  @Get('update')
  public async getUpdateNews(
    @Query('page') page: number,
    @Query('target') target: string,
  ): Promise<AppResponse<GameUpdateNewsResponse>> {
    return this.gameService.getUpdateNews(page, target);
  }

  @Public()
  @Get('update/:id')
  public async getUpdateNewsView(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('target') target: string,
  ): Promise<AppResponse<GameUpdateNewsView>> {
    return this.gameService.getUpdateNewsView(id, target);
  }

  @Public()
  @Get('events')
  public async getEvents(): Promise<AppResponse<GameEvent[]>> {
    return this.gameService.getEvents();
  }

  @Public()
  @Get('event/:id')
  public async getEvent(
    @Param('id') id: number,
  ): Promise<AppResponse<GameEventView>> {
    return this.gameService.getEventView(id);
  }

  @Public()
  @Get('notice')
  public async getNotice(
    @Query('page') page: number,
    @Query('target') target: string,
  ): Promise<AppResponse<GameNoticeResponse>> {
    return this.gameService.getNotice(page, target);
  }

  @Public()
  @Get('notice/:id')
  public async getNoticeView(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('target') target: string,
  ): Promise<AppResponse<GameNoticeView>> {
    return this.gameService.getNoticeView(id, target);
  }

  @Public()
  @Get('rank')
  public async getRank(
    @Query('page') page: number,
    @Query('target') target: string,
    @Query('w') world: number,
  ): Promise<any> {
    return this.gameService.getRank(page, world, target);
  }
}

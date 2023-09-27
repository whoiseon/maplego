import { Controller, Get, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';
import AppResponse from '../lib/app.response';
import { Public } from '../lib/decorators';
import {
  GameEvent,
  GameEventView,
  GameUpdateNews,
  GameUpdateNewsView,
} from './types';
import { GameUpdateNewsResponse } from './types/game-update-news-response.type';

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
}

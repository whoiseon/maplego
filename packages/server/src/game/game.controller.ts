import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import AppResponse from '../lib/app.response';
import { Public } from '../lib/decorators';
import { GameEvent, GameEventView } from './types';

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

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

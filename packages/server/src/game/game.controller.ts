import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import AppResponse from '../lib/app.response';
import { Public } from '../lib/decorators';

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Public()
  @Get('events')
  public async getEvents(): Promise<AppResponse<any>> {
    return this.gameService.getEvents();
  }
}

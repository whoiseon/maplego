import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ParseService } from '../parse/parse.service';

@Module({
  controllers: [GameController],
  providers: [GameService, ParseService],
})
export class GameModule {}

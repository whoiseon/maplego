import { GameCharacterRank } from './index';

export interface GameRankResponse {
  data: GameCharacterRank[];
  target: string;
  page: number;
}

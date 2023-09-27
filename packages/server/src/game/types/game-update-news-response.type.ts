import { GameUpdateNews } from './index';

export interface GameUpdateNewsResponse {
  data: GameUpdateNews[];
  target: string;
  page: number;
}

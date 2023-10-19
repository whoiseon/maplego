import { GameNotice } from './index';

export interface GameNoticeResponse {
  data: GameNotice[];
  target: string;
  page: number;
}

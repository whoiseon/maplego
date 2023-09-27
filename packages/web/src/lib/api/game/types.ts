import {
  AppResponse,
  GameEvent,
  GameEventView,
  GameUpdateNews,
} from '@/lib/api/types';

export interface GameEventResponse extends AppResponse {
  payload: GameEvent[];
}

export interface GameEventViewResponse extends AppResponse {
  payload: GameEventView;
}

export interface GameUpdateNewsResponse extends AppResponse {
  payload: {
    data: GameUpdateNews[];
    target: string;
    page: number;
  };
}

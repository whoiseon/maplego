import {
  AppResponse,
  GameEvent,
  GameEventView,
  GameNotice,
  GameUpdateNews,
  GameUpdateNewsView,
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

export interface GameUpdateNewsViewResponse extends AppResponse {
  payload: GameUpdateNewsView;
}

export interface GameNoticeResponse extends AppResponse {
  payload: {
    data: GameNotice[];
    target: string;
    page: number;
  };
}

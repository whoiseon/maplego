import {
  AppResponse,
  GameCharacterRank,
  GameEvent,
  GameEventView,
  GameNotice,
  GameNoticeView,
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

export interface GameNoticeViewResponse extends AppResponse {
  payload: GameNoticeView;
}

export interface GameRankResponse extends AppResponse {
  payload: {
    data: GameCharacterRank[];
    target: string;
    page: number;
  };
}

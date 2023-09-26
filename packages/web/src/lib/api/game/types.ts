import { AppResponse, GameEvent, GameEventView } from '@/lib/api/types';

export interface GameEventResponse extends AppResponse {
  payload: GameEvent[];
}

export interface GameEventViewResponse extends AppResponse {
  payload: GameEventView;
}

import { GameEventResponse, GameEventViewResponse } from '@/lib/api/game/types';
import { endpoint } from '@/lib/api/endpoint';

export async function fetchGetGameEvents(): Promise<GameEventResponse> {
  const response = await fetch(`${endpoint.game.events}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameEventResponse;
}

export async function fetchGetGameEventView(
  id: number,
): Promise<GameEventViewResponse> {
  const response = await fetch(`${endpoint.game.eventView(id)}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameEventViewResponse;
}

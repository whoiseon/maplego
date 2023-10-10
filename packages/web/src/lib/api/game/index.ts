import {
  GameEventResponse,
  GameEventViewResponse,
  GameNoticeResponse,
  GameUpdateNewsResponse,
  GameUpdateNewsViewResponse,
} from '@/lib/api/game/types';
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

export async function fetchGetGameUpdateNews(
  target?: string,
  page?: number,
): Promise<GameUpdateNewsResponse> {
  const response = await fetch(endpoint.game.updateNews(target, page), {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameUpdateNewsResponse;
}

export async function fetchGetGameUpdateNewsView(
  id: number,
  target?: string,
): Promise<GameUpdateNewsViewResponse> {
  const response = await fetch(endpoint.game.updateNewsView(id, target), {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameUpdateNewsViewResponse;
}

export async function fetchGetGameNotice(
  target?: string,
  page?: number,
): Promise<GameNoticeResponse> {
  const response = await fetch(`${endpoint.game.notice(target, page)}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameNoticeResponse;
}

import {
  GameEventResponse,
  GameEventViewResponse,
  GameNoticeResponse,
  GameNoticeViewResponse,
  GameRankResponse,
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

export async function fetchGetGameNoticeView(
  id: number,
  target?: string,
): Promise<GameNoticeViewResponse> {
  const response = await fetch(endpoint.game.noticeView(id, target || 'all'), {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameNoticeViewResponse;
}

export async function fetchGetGameRank(
  target?: string,
  page?: number,
  world?: number,
): Promise<GameRankResponse> {
  const response = await fetch(endpoint.game.rank(target, page, world), {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as GameRankResponse;
}

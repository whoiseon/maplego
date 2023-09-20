import { MaplePointHistoryResponse } from '@/lib/api/types';
import { endpoint } from '@/lib/api/endpoint';

export async function fetchGetMyPointHistory(
  page: number = 1,
  show: number = 10,
  accessToken?: string,
): Promise<MaplePointHistoryResponse | null> {
  const response = await fetch(
    `${endpoint.point.getPointHistory}?pageNumber=${page}&showCount=${show}`,
    {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return (await response.json()) as MaplePointHistoryResponse;
}

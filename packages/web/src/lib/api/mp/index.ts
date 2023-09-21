import { MaplePointHistoryParams, MaplePointHistoryResponse } from './types';
import { endpoint } from '@/lib/api/endpoint';

export async function fetchGetMyPointHistory({
  page,
  show,
  target,
  startDate,
  endDate,
  accessToken,
}: MaplePointHistoryParams): Promise<MaplePointHistoryResponse | null> {
  const response = await fetch(
    `${endpoint.point.getPointHistory}?pageNumber=${page || 1}&showCount=${
      show || 20
    }&target=${target || ''}&startDate=${startDate || ''}&endDate=${
      endDate || ''
    }`,
    {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return (await response.json()) as MaplePointHistoryResponse;
}

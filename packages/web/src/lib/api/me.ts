import { endpoint } from '@/lib/api/endpoint';
import { User, ErrorResponse } from './types';
import { fetchRefresh } from '@/lib/api/auth';

export async function fetchGetMe(): Promise<User | null> {
  try {
    const response = await fetch(endpoint.me.getMe, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });

    const data = (await response.json()) as User | ErrorResponse;

    if (!response.ok) {
      const error = data as ErrorResponse;

      if (error.statusCode === 500) return null;

      try {
        const { accessToken } = await fetchRefresh();

        if (!accessToken) {
          return null;
        }

        return await fetchGetMe();
      } catch (e) {
        return null;
      }
    }

    return data as User;
  } catch (e) {
    return null;
  }
}

export async function fetchGetMeOnServer(
  accessToken?: string,
): Promise<User | null> {
  const response = await fetch(endpoint.me.getMe, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = (await response.json()) as User | ErrorResponse;

  return data as User;
}

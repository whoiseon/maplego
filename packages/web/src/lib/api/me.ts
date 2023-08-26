import { endpoint } from '@/lib/api/endpoint';
import { User } from './types';
import { fetchRefresh } from '@/lib/api/auth';

export async function fetchGetMe(): Promise<User | null> {
  try {
    const response = await fetch(endpoint.me, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });

    const data = (await response.json()) as User;

    if (!response.ok) {
      if (data?.payload?.isExpiredToken) {
        const { accessToken } = await fetchRefresh();
        const me = await fetchGetMe();

        if (me?.name === 'Unauthorized' && !me.payload.isExpiredToken) {
          return null;
        }

        return me;
      }
    }

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchGetMeOnServer(
  accessToken?: string,
  refreshToken?: string,
): Promise<User | null> {
  const response = await fetch(endpoint.me, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = (await response.json()) as User;
  // if (!response.ok) {
  //   if (data?.payload?.isExpiredToken) {
  //     const { accessToken } = await fetchRefresh(refreshToken);
  //     const me = await fetchGetMeOnServer(accessToken);
  //
  //     if (me?.name === 'Unauthorized' && !me.payload.isExpiredToken) {
  //       return null;
  //     }
  //
  //     return me;
  //   } else {
  //     return null;
  //   }
  // }

  return data;
}

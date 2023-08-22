import { endpoint } from '@/lib/api/endpoint';
import { User } from './types';

export async function fetchGetMe(token?: string): Promise<User> {
  try {
    const response = await fetch(endpoint.me, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as User;

    return data;
  } catch (e) {
    throw e;
  }
}

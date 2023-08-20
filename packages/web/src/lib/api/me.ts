import { endpoint } from '@/lib/api/endpoint';

export async function fetchGetMe(token?: string) {
  try {
    const response = await fetch(endpoint.me, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (e) {}
}

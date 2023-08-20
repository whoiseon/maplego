import { endpoint } from '@/lib/api/endpoint';
import { Tokens } from '@/lib/api/types';

export interface SignUpParams {
  displayName: string;
  username: string;
  password: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

export async function fetchSignUp(params: SignUpParams) {
  const response = await fetch(endpoint.auth.signup, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchSignIn(params: SignInParams) {
  const response = await fetch(endpoint.auth.signin, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchRefresh(token?: string): Promise<Tokens> {
  const response = await fetch(endpoint.auth.refresh, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify({
      refreshToken: token,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const tokens = await response.json();
  return tokens;
}

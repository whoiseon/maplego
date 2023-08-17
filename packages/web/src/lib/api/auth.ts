import { endpoint } from '@/lib/api/endpoint';

export interface SignUpParams {
  displayName: string;
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

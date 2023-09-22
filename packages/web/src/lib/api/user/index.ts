import { endpoint } from '@/lib/api/endpoint';
import {
  UpdateProfileParams,
  UpdateProfileResponse,
} from '@/lib/api/user/types';

export async function fetchUpdateUserProfile(
  params: UpdateProfileParams,
): Promise<UpdateProfileResponse> {
  const response = await fetch(endpoint.user.updateProfile, {
    method: 'PATCH',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as UpdateProfileResponse;
}

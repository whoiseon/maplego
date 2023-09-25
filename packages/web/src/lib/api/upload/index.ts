import { MaplePointHistoryResponse } from '@/lib/api/mp/types';
import { endpoint } from '@/lib/api/endpoint';
import { UploadProfileResponse } from '@/lib/api/upload/types';

export async function fetchUploadProfile(
  formData: FormData,
): Promise<UploadProfileResponse | null> {
  const response = await fetch(endpoint.upload.profile, {
    method: 'post',
    cache: 'no-cache',
    credentials: 'include',
    body: formData,
  });

  return (await response.json()) as UploadProfileResponse;
}

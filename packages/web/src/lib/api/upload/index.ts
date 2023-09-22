import {
  MaplePointHistoryParams,
  MaplePointHistoryResponse,
} from '@/lib/api/mp/types';
import { endpoint } from '@/lib/api/endpoint';

export async function fetchUploadProfile(
  formData: FormData,
): Promise<MaplePointHistoryResponse | null> {
  const response = await fetch(endpoint.upload.profile, {
    method: 'post',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as MaplePointHistoryResponse;
}

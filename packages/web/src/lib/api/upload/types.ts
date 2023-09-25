import { AppResponse } from '@/lib/api/types';

export interface UploadProfileResponse extends AppResponse {
  payload: {
    path: string;
  };
}

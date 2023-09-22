import { AppResponse } from '@/lib/api/types';

export interface UpdateProfileParams {
  profileImage: string;
  displayName: string;
  introduction: string;
}

export interface UpdateProfileResponse extends AppResponse {
  payload: null;
}

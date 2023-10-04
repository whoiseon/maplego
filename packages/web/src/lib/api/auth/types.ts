import { AppResponse, Tokens, User } from '@/lib/api/types';

export interface SignUpResponse extends AppResponse {
  payload: null;
}

export interface SignInResponse extends AppResponse {
  payload: {
    user: User;
    token: Tokens;
  };
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse extends AppResponse {
  payload: null;
}

export interface CheckDisplayNameParams {
  displayName: string;
}

export interface CheckDisplayNameResponse extends AppResponse {
  payload: null;
}

export interface SendAuthMailResponse extends AppResponse {
  payload: null;
}

export interface VerifyAuthMailParams extends AppResponse {
  payload: null;
}

export interface SignUpResponse {
  registered: boolean;
}

export interface SignInResponse {
  user: User;
  token: Tokens;
}

export interface User {
  id: number;
  username: string;
  displayName: string;
  level: number;
  profileImage: string;
  introduction: string;
  lastLogin: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
  message: string;
  name: string;
  statusCode: number;
  payload?: any;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  changed: boolean;
  payload?: {
    field: 'currentPassword' | 'newPassword';
  };
}

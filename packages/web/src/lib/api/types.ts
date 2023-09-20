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
  mp: number;
}

export interface MaplePoint {
  id: number;
  point: number;
  message: string;
  createdAt: Date;
  updatedAt?: Date;
  userId?: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AppResponse {
  name: string;
  statusCode: number;
  message: string;
  payload: any;
}

export interface ErrorResponse extends AppResponse {}

export interface SignUpResponse extends AppResponse {
  payload: null;
}

export interface SignInResponse extends AppResponse {
  payload: {
    user: User;
    token: Tokens;
    isFirstSignIn: boolean;
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

export interface MaplePointHistoryResponse extends AppResponse {
  payload: {
    showCount: number;
    totalCount: number;
    pageNumber: number;
    data: MaplePoint[];
  };
}

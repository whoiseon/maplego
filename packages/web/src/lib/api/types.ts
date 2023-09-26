export interface User {
  id: number;
  username: string;
  displayName: string;
  introduction: string;
  profileImage: string;
  lastLogin: string;
  email: string;
  level: number;
  createdAt: string;
  updatedAt: string;
  displayNameChangedAt: string;
  mp: number;
}

export interface MaplePoint {
  id: number;
  point: number;
  prevPoint: number;
  message: string;
  createdAt: string;
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

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
  prevPoint: number;
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

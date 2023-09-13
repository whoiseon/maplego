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

interface ApiBaseResponse {
  name: string;
  statusCode: number;
  message: string;
  payload: any;
}

export interface SignUpResponse extends ApiBaseResponse {
  payload: null;
}

export interface SignInResponse extends ApiBaseResponse {
  payload: {
    user: User;
    token: Tokens;
  };
}

export interface User extends ApiBaseResponse {
  id: number;
  username: string;
  displayName: string;
  level: number;
}

export interface Tokens extends ApiBaseResponse {
  accessToken: string;
  refreshToken: string;
}

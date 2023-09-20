export type AccessTokenPayload = {
  type: 'access_token';
  userId: number;
  username: string;
  displayName: string;
};

export type RefreshTokenPayload = {
  type: 'refresh_token';
  userId: number;
};

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;

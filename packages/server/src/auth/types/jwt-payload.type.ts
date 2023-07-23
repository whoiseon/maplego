export type AccessTokenPayload = {
  type: 'access_token';
  userId: number;
  tokenId: number;
  username: string;
};

export type RefreshTokenPayload = {
  type: 'refresh_token';
  tokenId: number;
  rotationCounter: number;
};

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;

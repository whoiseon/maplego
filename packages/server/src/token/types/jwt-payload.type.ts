export type AccessTokenPayload = {
  type: 'access_token';
  userId: number;
  tokenId: number;
  username: string;
  displayName: string;
  level: number;
};

export type RefreshTokenPayload = {
  type: 'refresh_token';
  tokenId: number;
  rotationCounter: number;
  blocked: boolean;
};

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;

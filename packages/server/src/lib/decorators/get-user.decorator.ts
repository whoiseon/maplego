import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenPayload } from 'src/token/types';

export const GetUser = createParamDecorator(
  (data: keyof AccessTokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);

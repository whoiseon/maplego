import { ApiBaseResponseType } from 'src/types';
import { Tokens } from 'src/token/types/token.type';
import { User } from '@prisma/client';

export interface SignInResponseType extends ApiBaseResponseType {
  payload: SignInResponsePayload;
}

interface SignInResponsePayload {
  user: User;
  tokens: Tokens;
}

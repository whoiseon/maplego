import { Tokens } from 'src/token/types/token.type';
import { User } from '@prisma/client';

export interface SignInResponseType {
  user: User;
  tokens: Tokens;
  isFirstSignIn: boolean;
}

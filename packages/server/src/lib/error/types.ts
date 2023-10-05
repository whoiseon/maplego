type ErrorName =
  | 'emailAlreadyExists'
  | 'unknown'
  | 'wrongCode'
  | 'expiredCode'
  | 'usernameAlreadyExists'
  | 'wrongCredentials'
  | 'unauthorized'
  | 'displayNameAlreadyExists'
  | 'samePassword'
  | 'notFoundUser';

interface ErrorPayload {
  name: string;
  statusCode: number;
  message: string;
}

type AppErrorMap = Record<ErrorName, ErrorPayload>;

export const appErrors: AppErrorMap = {
  emailAlreadyExists: {
    name: 'EmailAlreadyExists',
    statusCode: 409,
    message: 'email already exists',
  },
  unknown: {
    name: 'Unknown',
    statusCode: 500,
    message: 'unknown error',
  },
  wrongCode: {
    name: 'WrongCode',
    statusCode: 400,
    message: 'wrong code',
  },
  expiredCode: {
    name: 'ExpiredCode',
    statusCode: 400,
    message: 'expired code',
  },
  usernameAlreadyExists: {
    name: 'UsernameAlreadyExists',
    statusCode: 409,
    message: 'username already exists',
  },
  wrongCredentials: {
    name: 'WrongCredentials',
    statusCode: 401,
    message: 'invalid username or password',
  },
  unauthorized: {
    name: 'Unauthorized',
    statusCode: 401,
    message: 'access token is missing or invalid',
  },
  notFoundUser: {
    name: 'NotFoundUser',
    statusCode: 404,
    message: 'user not found',
  },
  displayNameAlreadyExists: {
    name: 'DisplayNameAlreadyExists',
    statusCode: 409,
    message: 'display name already exists',
  },
  samePassword: {
    name: 'SamePassword',
    statusCode: 400,
    message: 'same password',
  },
};

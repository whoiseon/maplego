import { HttpException } from '@nestjs/common';

const errors = {
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Access token is missing or invalid',
  },
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  RefreshFailure: {
    statusCode: 401,
    message: 'Failed to refresh token',
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
  InvalidURL: {
    statusCode: 422,
    message: 'Invalid URL',
  },
  AlreadyExists: {
    statusCode: 409,
    message: 'The data already exists',
  },
};

type ErrorName = keyof typeof errors;

interface ErrorPayload
{
  Unauthorized: {
    isExpiredToken: boolean;
  };
  AlreadyExists: {
    field: string;
  };
  BadRequest: any;
  NotFound: any;
  Forbidden: any;
  InvalidURL: any;
  Unknown: any;
  WrongCredentials: any;
  RefreshFailure: any;
}

type ErrorPayloadWithDefault = Omit<
  Record<ErrorName, undefined>,
  keyof ErrorPayload
> &
  ErrorPayload;

export class AppError extends HttpException
{
  public statusCode: number;

  constructor(
    public name: ErrorName,
    public payload: ErrorPayloadWithDefault[ErrorName] = {},
  )
  {
    const errorInfo = errors[name];
    super(errorInfo.message, errorInfo.statusCode);

    this.statusCode = errorInfo.statusCode;
  }
}

export function isAppError(error: any): error is AppError
{
  return error instanceof AppError;
}

type ResponseName =
  | 'Success'
  | 'EmailAlreadyExists'
  | 'Unknown'
  | 'WrongCode'
  | 'ExpiredCode'
  | 'UsernameAlreadyExists'
  | 'WrongCredentials'
  | 'Unauthorized'
  | 'DisplayNameAlreadyExists'
  | 'SamePassword'
  | 'NotFound'
  | 'NotFoundUser'
  | 'InvalidTarget'
  | 'NotEnoughMaplePoint';

interface ResponsePayload {
  name: string;
  statusCode: number;
  message: string;
  payload: any;
}

type ResponseMap = Record<ResponseName, ResponsePayload>;

export const responseInfo: ResponseMap = {
  Success: {
    name: '',
    statusCode: 200,
    message: '',
    payload: null,
  },
  EmailAlreadyExists: {
    name: 'EmailAlreadyExists',
    statusCode: 409,
    message: 'email already exists',
    payload: null,
  },
  Unknown: {
    name: 'Unknown',
    statusCode: 500,
    message: 'unknown error',
    payload: null,
  },
  WrongCode: {
    name: 'WrongCode',
    statusCode: 400,
    message: 'wrong code',
    payload: null,
  },
  ExpiredCode: {
    name: 'ExpiredCode',
    statusCode: 400,
    message: 'expired code',
    payload: null,
  },
  UsernameAlreadyExists: {
    name: 'UsernameAlreadyExists',
    statusCode: 409,
    message: 'username already exists',
    payload: null,
  },
  WrongCredentials: {
    name: 'WrongCredentials',
    statusCode: 401,
    message: 'invalid username or password',
    payload: null,
  },
  Unauthorized: {
    name: 'Unauthorized',
    statusCode: 401,
    message: 'access token is missing or invalid',
    payload: null,
  },
  NotFound: {
    name: 'NotFound',
    statusCode: 404,
    message: 'the data not found',
    payload: null,
  },
  NotFoundUser: {
    name: 'NotFoundUser',
    statusCode: 404,
    message: 'user not found',
    payload: null,
  },
  DisplayNameAlreadyExists: {
    name: 'DisplayNameAlreadyExists',
    statusCode: 409,
    message: 'display name already exists',
    payload: null,
  },
  SamePassword: {
    name: 'SamePassword',
    statusCode: 400,
    message: 'same password',
    payload: null,
  },
  InvalidTarget: {
    name: 'InvalidTarget',
    statusCode: 400,
    message: 'invalid target',
    payload: null,
  },
  NotEnoughMaplePoint: {
    name: 'NotEnoughMaplePoint',
    statusCode: 400,
    message: 'not enough maple point',
    payload: null,
  },
};

export default class AppResponse<T> {
  public name: string;
  public statusCode: number;
  public message: string;
  public payload: T;

  constructor(name: ResponseName, payload?: T) {
    const response = responseInfo[name];

    this.name = response.name;
    this.statusCode = response.statusCode;
    this.message = response.message;

    if (name === 'Success') {
      this.payload = payload ? (payload as T) : null;
    } else {
      this.payload = null;
    }

    return {
      name: this.name,
      statusCode: this.statusCode,
      message: this.message,
      payload: this.payload,
    };
  }
}

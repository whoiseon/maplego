import { appErrors } from './error';

export default class AppResponse<T> {
  public name: string;
  public statusCode: number;
  public message: string;
  public payload: T;
  constructor(params: BaseResponse<T> | QuickResponse) {
    if (typeof params === 'string') {
      switch (params) {
        case 'unknown':
          return {
            name: appErrors.unknown.name,
            statusCode: appErrors.unknown.statusCode,
            message: appErrors.unknown.message,
            payload: null,
          };
        case 'success':
          return {
            name: '',
            statusCode: 200,
            message: '',
            payload: null,
          };
      }

      return;
    }

    this.name = params.name;
    this.statusCode = params.statusCode;
    this.message = params.message;
    this.payload = params.payload;

    return {
      name: params.name,
      statusCode: params.statusCode,
      message: params.message,
      payload: params.payload,
    };
  }
}

interface BaseResponse<T> {
  name: string;
  statusCode: number;
  message: string;
  payload: T;
}

type QuickResponse = 'unknown' | 'success';

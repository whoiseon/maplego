import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppError } from 'src/lib/error/app-error';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(exception.getStatus()).json({
      name: exception.name,
      statusCode: exception.getStatus(),
      message: exception.message,
      payload: exception.payload,
    });
  }
}

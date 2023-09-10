import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppErrorFilter } from 'src/lib/error/app-error.filter';
import helmet from 'helmet';
import hpp from 'hpp';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalFilters(new AppErrorFilter());

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(hpp());

    app.enableCors({
      origin: true,
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(8080);
}

bootstrap();

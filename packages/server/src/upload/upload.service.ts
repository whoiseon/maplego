import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AppResponse from '../lib/app.response';
import { UploadProfileResponse } from './upload-profile-response.type';
import * as process from 'process';

@Injectable()
export class UploadService {
  constructor(private readonly db: PrismaService) {}

  async uploadProfile(
    file: Express.Multer.File,
  ): Promise<AppResponse<UploadProfileResponse>> {
    const { filename } = file;

    const path =
      process.env.NODE_ENV === 'production'
        ? ''
        : `/data/user/profile/${filename}`;

    return new AppResponse({
      name: '',
      message: '',
      statusCode: 200,
      payload: {
        path,
      },
    });
  }
}

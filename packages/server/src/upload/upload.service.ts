import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AppResponse from '../lib/app.response';
import { UploadProfileResponse } from './upload-profile-response.type';

@Injectable()
export class UploadService {
  constructor(private readonly db: PrismaService) {}

  async uploadProfile(
    file: Express.Multer.File,
  ): Promise<AppResponse<UploadProfileResponse>> {
    const { filename } = file;

    const path = `/images/profile/${filename}`;

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

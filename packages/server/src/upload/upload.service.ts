import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AppResponse from '../lib/app.response';
import { UploadProfileResponse } from './upload-profile-response.type';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  constructor(private readonly db: PrismaService) {}

  async uploadProfile(
    file: Express.Multer.File,
  ): Promise<AppResponse<UploadProfileResponse>> {
    const { filename, buffer } = file;

    // // image resize
    // const resizedBuffer = await sharp(buffer)
    //   .resize(600, 600, {
    //     fit: 'cover',
    //     position: 'center',
    //   })
    //   .toBuffer();
    //
    // // save image
    // await sharp(resizedBuffer).toFile(
    //   `/home/ubuntu/data/images/profile/${filename}`,
    // );

    const path = `/images/profile/${filename}`;

    return new AppResponse('Success', {
      path,
    });
  }
}

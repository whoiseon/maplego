import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as fs from 'fs';
import multer from 'multer';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  public dirPath: string =
    process.env.NODE_ENV === 'production'
      ? '/home/ubuntu/data/images/profile'
      : this.configService.get<string>('DEV_USER_PROFILE_IMAGE_PATH');

  constructor(private readonly configService: ConfigService) {}

  public createMulterOptions(): MulterModuleOptions {
    const uuid = uuidv4();
    const dirPath = this.dirPath;
    return {
      storage: multer.diskStorage({
        destination(req, file, done) {
          // 파일 저장 경로 설정
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          done(null, dirPath);
        },
        filename(req, file, done) {
          // 파일 이름 설정
          const ext = path.extname(file.originalname);
          done(null, `${uuid}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // file size limit: 5MB
    };
  }
}

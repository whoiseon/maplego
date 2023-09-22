import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as fs from 'fs';
import multer from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  public dirPath: string =
    process.env.NODE_ENV === 'production'
      ? ''
      : this.configService.get<string>('DEV_USER_PROFILE_IMAGE_PATH');

  constructor(private readonly configService: ConfigService) {}

  // create folder if not exist
  public mkdir() {
    try {
      fs.readdirSync(this.dirPath);
    } catch (e) {
      fs.mkdirSync(this.dirPath);
    }
  }

  public createMulterOptions() {
    const dirPath = this.dirPath;
    return {
      storage: multer.diskStorage({
        destination(req, file, done) {
          done(null, dirPath);
        },
        filename(req, file, done) {
          // 파일 이름 설정
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          done(null, `${name}_${Date.now()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // file size limit: 5MB
    };
  }
}

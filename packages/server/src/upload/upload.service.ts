import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly db: PrismaService) {}

  async uploadProfile(file: Express.Multer.File) {
    console.log(file);
  }
}

import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { AuthGuard } from '../auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // file size limit: 5MB
  @Post('profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fieldSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadProfile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadProfile(file);
  }
}

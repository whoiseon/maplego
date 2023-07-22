import { Injectable } from '@nestjs/common';
import { AppVersionReturnTypes } from 'src/app.types';

@Injectable()
export class AppService {
  public getVersion(): AppVersionReturnTypes {
    return {
      project: 'MSIN',
      version: '1.0.0',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { AppVersionReturnTypes } from 'src/types';

@Injectable()
export class AppService {
  public getVersion(): AppVersionReturnTypes {
    return {
      project: 'MSIN',
      version: '1.0.0',
    };
  }
}

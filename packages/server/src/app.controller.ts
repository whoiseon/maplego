import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppVersionReturnTypes } from 'src/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getVersion(): AppVersionReturnTypes {
    return this.appService.getVersion();
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from 'src/me/me.service';
import { GetUser } from 'src/lib/decorators';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MeResponseType } from './types/me-response.type';

@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getMe(@GetUser() user: User): Promise<MeResponseType> {
    return this.meService.getMeAll(user);
  }
}

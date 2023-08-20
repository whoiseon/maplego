import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from 'src/me/me.service';
import { GetUser } from 'src/lib/decorators';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/lib/guards/auth.guard';

@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}

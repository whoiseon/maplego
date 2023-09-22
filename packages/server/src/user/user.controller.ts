import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards';
import { GetUser } from '../lib/decorators';
import { User } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch('/profile')
  public async updateUserProfile(
    @GetUser() user: User,
    @Body() body: UpdateProfileDto,
  ) {
    return this.userService.updateUserProfile(user.id, body);
  }
}

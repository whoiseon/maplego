import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpBodyDto: SignUpBodyDto) {
    return this.authService.signUp(signUpBodyDto);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import { SignInBodyDto } from 'src/auth/dto/sign-in-body.dto';
import { Request } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { Public } from 'src/lib/decorators';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpBodyDto: SignUpBodyDto) {
    return this.authService.signUp(signUpBodyDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInBodyDto: SignInBodyDto,
    @Req() req: Request,
  ) {
    const response = await this.authService.signIn(signInBodyDto);
    this.cookieService.setTokenCookie(req, response.payload.tokens);

    return response;
  }
}

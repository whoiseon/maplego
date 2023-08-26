import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import { SignInBodyDto } from 'src/auth/dto/sign-in-body.dto';
import { Request } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { Public } from 'src/lib/decorators';
import { SignInResponseType, SignUpResponseType } from 'src/auth/types';
import { AuthGuard } from 'src/lib/guards';
import { Tokens } from 'src/token/types';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body() signUpBodyDto: SignUpBodyDto,
  ): Promise<SignUpResponseType> {
    return this.authService.signUp(signUpBodyDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInBodyDto: SignInBodyDto,
    @Req() req: Request,
  ): Promise<SignInResponseType> {
    const response = await this.authService.signIn(signInBodyDto);
    this.cookieService.setTokenCookie(req, response.payload.tokens);

    return response;
  }

  @Public()
  @UseGuards(AuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() req: Request,
    @Body() body,
  ): Promise<Tokens> {
    const refreshToken = body.refreshToken || req.cookies.refresh_token;
    const tokens = await this.authService.refreshToken(refreshToken);
    this.cookieService.setTokenCookie(req, tokens);
    req.res.header('123', '123');

    return tokens;
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpBodyDto } from 'src/auth/dto/sign-up-body.dto';
import { SignInBodyDto } from 'src/auth/dto/sign-in-body.dto';
import { Request, Response } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { GetUser, Public } from 'src/lib/decorators';
import { SignInResponseType, SignUpResponseType } from 'src/auth/types';
import { AuthGuard } from 'src/auth/guards';
import { User } from '@prisma/client';
import { ChangePasswordBodyDto } from './dto/change-password-body.dto';
import AppResponse from '../lib/app.response';
import { ExistDisplayNameDto } from './dto/exist-display-name.dto';

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
  ): Promise<AppResponse<SignUpResponseType>> {
    return this.authService.signUp(signUpBodyDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInBodyDto: SignInBodyDto,
    @Req() req: Request,
  ): Promise<AppResponse<SignInResponseType>> {
    const response = await this.authService.signIn(signInBodyDto);

    if (response.statusCode === 200) {
      this.cookieService.setTokenCookie(req, response.payload.tokens);
    }

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  public async signOut(@Req() req: Request, @GetUser() user: User) {
    await this.authService.signOut(user);
    this.cookieService.clearTokenCookie(req);
  }

  @Public()
  @UseGuards(AuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const refreshToken = body.refreshToken || req.cookies.refresh_token;
    const { accessToken } = (await this.authService.refreshToken(refreshToken))
      .payload;

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    res.send({ accessToken });
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @GetUser() user: User,
    @Body() body: ChangePasswordBodyDto,
  ) {
    return await this.authService.changePassword(user.id, body);
  }

  @Public()
  @Post('exist/displayName')
  @HttpCode(HttpStatus.OK)
  public async checkDisplayName(
    @Body() body: ExistDisplayNameDto,
  ): Promise<AppResponse<null>> {
    return await this.authService.existDisplayName(body.displayName);
  }
}

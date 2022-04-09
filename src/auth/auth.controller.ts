import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/:magik')
  async login(
    @Param('magik') magik: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(magik);

    if (!result) {
      response.status(HttpStatus.FORBIDDEN);
      return {
        success: false,
        redirect: '/info',
      };
    } else {
      const { refreshToken, accessToken: bearer } = result;
      response.cookie('Refresh', refreshToken, { httpOnly: true });

      return {
        success: true,
        redirect: '/',
        bearer,
      };
    }
  }

  @Get('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh = request.cookies.Refresh;
    await this.authService.logout(refresh);
    response.clearCookie('Refresh');
    return {
      success: true,
      redirect: '/info',
    };
  }
}

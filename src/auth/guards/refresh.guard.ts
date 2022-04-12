import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private token: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.token.verifyRefresh(request.cookies.Refresh);
  }
}

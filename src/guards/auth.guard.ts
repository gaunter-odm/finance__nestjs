import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from "express";
import { verifyAccessToken } from "../utils/verifyAccessToken.util";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const bearer = req.header('Authorization');

    return !!verifyAccessToken(bearer);
  }
}

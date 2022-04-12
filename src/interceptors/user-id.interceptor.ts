import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserIdInterceptor implements NestInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const bearer = request.header('Authorization').split(' ')[1];
    const payload = this.tokenService.verifyAccess(bearer);
    if (payload) request.body.user = payload._id;
    return next.handle();
  }
}

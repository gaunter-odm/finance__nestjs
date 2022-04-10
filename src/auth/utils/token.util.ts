import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface JWTPayload extends JwtPayload {
  _id: Types.ObjectId;
}

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  readonly accessSecret = this.configService.get('ACCESS_SECRET');
  readonly refreshSecret = this.configService.get('REFRESH_SECRET');

  createAccess(payload: JWTPayload, expiresIn: string): string {
    return sign(payload, this.accessSecret, {
      expiresIn,
    });
  }

  createRefresh(expiresIn): string {
    return sign({}, this.refreshSecret, { expiresIn });
  }

  verifyAccess(token: string): false | JwtPayload {
    try {
      const jwt = verify(token, this.accessSecret);
      if (typeof jwt !== 'string') return jwt;
    } catch (e) {
      return false;
    }
  }

  verifyRefresh(token: string): boolean {
    try {
      return !!verify(token, this.refreshSecret);
    } catch (e) {
      return false;
    }
  }
}

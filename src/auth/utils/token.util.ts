import { ACCESS_SECRET, REFRESH_SECRET } from '../../config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';

interface JWTPayload extends JwtPayload {
  _id: Types.ObjectId;
}

export class Token {
  static readonly accessSecret: string = ACCESS_SECRET;
  static readonly refreshSecret: string = REFRESH_SECRET;

  static createAccess(payload: JWTPayload, expiresIn: string): string {
    return sign(payload, this.accessSecret, { expiresIn });
  }

  static createRefresh(expiresIn): string {
    return sign({}, this.refreshSecret, { expiresIn });
  }

  static verifyAccess(token: string): false | JwtPayload {
    try {
      const jwt = verify(token, this.accessSecret);
      if (typeof jwt !== 'string') return jwt;
    } catch (e) {
      return false;
    }
  }

  static verifyRefresh(token: string): boolean {
    try {
      return !!verify(token, this.refreshSecret);
    } catch (e) {
      return false;
    }
  }
}

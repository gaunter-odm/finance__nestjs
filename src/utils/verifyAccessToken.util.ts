import { JwtPayload, verify } from 'jsonwebtoken';
import { SECRET } from '../config';

interface JWTPayload extends JwtPayload {
  _id: string;
}

export const verifyAccessToken = (
  header: string | undefined,
): JWTPayload | false => {
  if (typeof header === 'undefined') return false;

  const [bearer, token] = header.split(' ');
  let payload;

  if ('Bearer' === bearer && typeof token === 'string') {
    try {
      payload = verify(token, SECRET);
    } catch (e) {
      payload = false;
    }
    return payload;
  } else {
    return false;
  }
};

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { verifyLink } from './utils/verifyLink.util';
import { SECRET } from '../config';
import { MagikLink, MagikLinkDocument } from '../schemas/MagikLink.schema';
import { User, UserDocument } from '../schemas/User.schema';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../schemas/RefreshToken.schema';
import { setExpiresIn } from '../utils/setExpiresIn.util';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(MagikLink.name) private magikModel: Model<MagikLinkDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshModel: Model<RefreshTokenDocument>,
  ) {}

  async login(magik: string): Promise<Tokens | false> {
    const link: MagikLinkDocument = await this.magikModel.findOne({ magik });
    if (!verifyLink(link)) return false;

    const { _id } = link.user;

    const accessToken = sign({ _id }, SECRET, { expiresIn: '10m' });
    const refresh = new this.refreshModel({
      user: _id,
      token: uuid(),
      expiresIn: setExpiresIn('1d'),
    });

    try {
      await refresh.save();
    } catch (e) {
      console.log(e);
      return false;
    }

    return { accessToken, refreshToken: refresh.token };
  }

  async logout(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    const delRes = await this.refreshModel.deleteOne({ token });
    return !!delRes.deletedCount;
  }
}

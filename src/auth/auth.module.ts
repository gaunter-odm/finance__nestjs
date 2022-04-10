import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MagikLink, MagikLinkSchema } from '../schemas/MagikLink.schema';
import { User, UserSchema } from '../schemas/User.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../schemas/RefreshToken.schema';
import { TokenService } from './utils/token.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MagikLink.name, schema: MagikLinkSchema },
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}

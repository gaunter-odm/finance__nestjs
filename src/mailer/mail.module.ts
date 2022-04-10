import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfirmLink, ConfirmLinkSchema } from '../schemas/ConfirmLink.schema';
import { TokenService } from '../auth/utils/token.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConfirmLink.name,
        schema: ConfirmLinkSchema,
      },
    ]),
    MailerModule.forRoot({
      transport: process.env.SMTP,
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, TokenService],
})
export class MailModule {}

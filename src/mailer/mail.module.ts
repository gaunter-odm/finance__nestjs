import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfirmLink, ConfirmLinkSchema } from '../schemas/ConfirmLink.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConfirmLink.name,
        schema: ConfirmLinkSchema,
      },
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('SMTP'),
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConfirmLink,
  ConfirmLinkDocument,
} from '../schemas/ConfirmLink.schema';
import { Model, Types } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectModel(ConfirmLink.name)
    private confirmLink: Model<ConfirmLinkDocument>,
  ) {}

  async send(user: Types.ObjectId) {
    const linkModel: ConfirmLinkDocument = new this.confirmLink({
      user,
      link: v4(),
    });

    await linkModel.save();
    await linkModel.populate('user');

    const link = linkModel.link;
    const email = linkModel.user.email;
    const confirmUrl = `${this.configService.get('CONFIRM_LINK')}${link}`;
    const response = {
      success: undefined,
      message: undefined,
    };

    if (!email) {
      response.success = false;
      response.message = 'E-mail отсутствует';

      return response;
    } else if (linkModel.user.isActivate) {
      response.success = false;
      response.message = 'E-mail уже подтвержден';

      return response;
    }

    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'Personal Finance App <personal.finance.lite@gmail.com>',
        subject: 'Подтверждение электронной почты',
        template: 'confirm',
        context: {
          name: 'Vitalii',
          confirmUrl,
        },
      });
      response.success = true;
      response.message = 'Подтверждение отправлено вам на почту';

      return response;
    } catch (e) {
      response.success = false;
      response.message = 'Что то пошло не так!';

      return response;
    }
  }

  async confirm(link: string) {
    const linkModel = await this.confirmLink.findOneAndDelete({ link });
    if (linkModel) {
      await linkModel.populate('user');
      linkModel.user.isActivate = true;
      await linkModel.user.save();
      return {
        success: true,
        redirect: '/confirmed',
      };
    } else {
      return {
        success: false,
        redirect: '/',
      };
    }
  }
}

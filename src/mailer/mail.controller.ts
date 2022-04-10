import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id.interceptor';
import { Types } from 'mongoose';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  @UseGuards(AuthGuard)
  @UseInterceptors(UserIdInterceptor)
  send(@Body('user') user: Types.ObjectId) {
    return this.mailService.send(user);
  }

  @Get('confirm/:link')
  async confirm(@Param('link') link: string) {
    return await this.mailService.confirm(link);
  }
}

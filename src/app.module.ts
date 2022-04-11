import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mailer/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './auth/utils/token.util';

@Module({
  controllers: [AppController],
  providers: [AppService, TokenService],
  imports: [
    PurchasesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri: configService.get('MONGO'),
      }),
    }),
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}

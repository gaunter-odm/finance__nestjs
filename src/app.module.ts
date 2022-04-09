import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PurchasesModule, MongooseModule.forRoot(MONGO), AuthModule],
})
export class AppModule {}

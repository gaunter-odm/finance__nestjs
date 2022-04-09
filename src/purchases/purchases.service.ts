import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { Record } from '../schemas/Record.schema';

@Injectable()
export class PurchasesService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createPurchaseDto: CreatePurchaseDto) {
    return 'This action adds a new purchase' + createPurchaseDto;
  }

  async findAll(): Promise<Record[] | undefined> {
    const user = await this.userModel.findOne({ id: 921469172 });
    return user?.records;
  }

  async findOne(id: string): Promise<Record | undefined> {
    const user = await this.userModel.findOne({ id });

    return user.records[0];
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase` + updatePurchaseDto;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Record } from './Record.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  currency: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  isActivate: boolean;

  @Prop({ default: 2 })
  timezone: number;

  @Prop()
  created_at: string;

  @Prop()
  records: Record[];
}

export const UserSchema = SchemaFactory.createForClass(User);

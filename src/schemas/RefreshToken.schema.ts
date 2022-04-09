import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from './User.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresIn: number;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

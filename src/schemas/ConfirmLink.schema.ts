import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User, UserDocument } from './User.schema';

export type ConfirmLinkDocument = ConfirmLink & Document;

@Schema({ timestamps: true, expires: '5m' })
export class ConfirmLink {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId & UserDocument;

  @Prop({ unique: true, required: true })
  link: string;
}

export const ConfirmLinkSchema = SchemaFactory.createForClass(ConfirmLink);

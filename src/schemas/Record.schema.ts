import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop()
  date: string;

  @Prop()
  position: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);

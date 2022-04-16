import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { User } from "./User.schema";

export type MagikLinkDocument = MagikLink & Document;

@Schema({ timestamps: true, expires: "5m" })
export class MagikLink {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId;

  @Prop({ unique: true, required: true })
  magik: string;

  @Prop({ required: true })
  expiresIn: number;
}

export const MagikLinkSchema = SchemaFactory.createForClass(MagikLink);

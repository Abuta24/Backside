import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Invoice' })
  invoices: [mongoose.Schema.Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);

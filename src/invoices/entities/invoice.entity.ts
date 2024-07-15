import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Invoice {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  user: mongoose.Schema.Types.ObjectId[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

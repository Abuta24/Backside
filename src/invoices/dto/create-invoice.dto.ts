import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class CreateInvoiceDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;
}

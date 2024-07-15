import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;
}

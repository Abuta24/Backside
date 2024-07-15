import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return await createdInvoice.save();
  }

  findAll(query: any) {
    return this.invoiceModel.find(query).populate('user').exec();
  }

  findOne(id: string) {
    return this.invoiceModel.findById(id).exec();
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Invoice | null> {
    try {
      const deletedInvoice = await this.invoiceModel.findByIdAndDelete(id);
      return deletedInvoice;
    } catch (error) {
      throw new BadRequestException(`Failed to delete invoice`);
    }
  }
}

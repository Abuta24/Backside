import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './entities/invoice.entity';
import { CurrentUserDto } from 'src/user/dto/currentUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private usersService: UserService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, user: CurrentUserDto) {
    const invoice = await this.invoiceModel.create({
      ...createInvoiceDto,
      userId: user.id,
    });
    await this.usersService.addInvoice(user.id, invoice._id);
    return invoice;
  }

  findAll() {
    return this.invoiceModel.find().populate({
      path: 'userId',
      select: 'email _id',
    });
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

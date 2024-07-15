import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      const newInvoice = await this.invoicesService.create(createInvoiceDto);
      return newInvoice;
    } catch (error) {
      throw new HttpException(
        'Failed to create invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.invoicesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedInvoice = await this.invoicesService.remove(id);
      if (!deletedInvoice) {
        throw new BadRequestException(`Invoice with ID not found`);
      }
      return { message: 'Invoice deleted successfully', deletedInvoice };
    } catch (error) {
      throw new BadRequestException(`Failed to delete invoice`);
    }
  }
}

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
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { CurrentUserDto } from 'src/user/dto/currentUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.invoicesService.create(createInvoiceDto, user);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
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

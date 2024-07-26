import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.UserModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new this.UserModel(createUserDto);
    return user.save();
  }

  async findAll() {
    return this.UserModel.find().populate({
      path: 'invoices',
      select: 'description amount price',
    });
  }

  findOne(id: any) {
    return this.UserModel.findById(id).populate({
      path: 'invoices',
      select: 'description amount price',
    });
  }

  async findOnez(email: string) {
    return this.UserModel.findOne({ email: email }).select([
      'email',
      'password',
    ]);
  }

  findByEmail(email: string) {
    return this.UserModel.findOne({ email: email }).select([
      'email',
      'password',
      '_id',
    ]);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }

  findById(id: ObjectId): Promise<User> {
    return this.UserModel.findById(id);
  }

  async getCurrentUser(email: string): Promise<User> {
    return this.UserModel.findOne({ email });
  }

  async addInvoice(
    userId: mongoose.Schema.Types.ObjectId,
    invoiceId: mongoose.Schema.Types.ObjectId,
  ) {
    const user = await this.UserModel.findById(userId);
    user.invoices.push(invoiceId);
    user.save();
  }
}

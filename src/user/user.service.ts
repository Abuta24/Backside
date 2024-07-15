import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.UserModel.create(createUserDto);
      await createdUser.save();

      return createdUser;
    } catch (er) {
      throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return this.UserModel.find().populate('invoices');
  }

  async findOne(email: string) {
    return this.UserModel.findOne({ email: email }).select([
      'email',
      'password',
    ]);
  }

  findOneByEmail(email: string) {
    return this.UserModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }

  async getCurrentUser(email: string): Promise<User> {
    return this.UserModel.findOne({ email });
  }
}

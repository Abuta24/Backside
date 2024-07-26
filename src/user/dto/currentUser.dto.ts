import mongoose from 'mongoose';

export class CurrentUserDto {
  email: string;
  id: mongoose.Schema.Types.ObjectId;
}

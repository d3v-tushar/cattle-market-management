import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { UserConstant } from './user.constant';

const userSchema = new Schema<IUser, UserModel>(
  {
    password: { type: String, required: true },
    role: { type: String, required: true, enum: UserConstant.role },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IUser, UserModel>('User', userSchema);

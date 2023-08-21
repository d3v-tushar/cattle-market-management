import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { CowConstant } from './cow.constant';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: CowConstant.location },
    breed: { type: String, required: true, enum: CowConstant.breed },
    weight: { type: Number, required: true },
    label: { type: String, required: true, enum: CowConstant.label },
    category: { type: String, required: true, enum: CowConstant.category },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);

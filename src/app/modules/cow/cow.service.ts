import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';
import { User } from '../user/user.model';

const createCow = async (payload: Partial<ICow>): Promise<ICow> => {
  if (!payload.label) {
    payload.label = 'for sale';
  }
  const seller = await User.findById(payload.seller);
  if (!seller) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller Not Found!');
  }
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};

const getAllCows = async (): Promise<ICow[]> => {
  const result = await Cow.find().populate('seller');
  return result;
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const isExist = await Cow.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow Not Found!');
  }
  const result = await Cow.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow Not Found!');
  }
  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};

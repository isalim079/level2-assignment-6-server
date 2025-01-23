import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getEmailFromUsers = async () => {
  const result = await User.find().select("email");
  return result;
};

const resetPassword = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const updatePass = await User.findOneAndUpdate(
    { email: email },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  return updatePass;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getEmailFromUsers,
  resetPassword,
};

import { TLoginUser } from "../auth/auth.interface";
import LoggedUserInfo from "./loggedUser.model";

const createLoggedUserInfo = async (userData: TLoginUser) => {
  const result = await LoggedUserInfo.create(userData);
  return result;
};

const deleteLoggedUserInfo = async (id: string) => {
  const result = await LoggedUserInfo.deleteOne({ _id: id });
  return result;
};

const getLoggedUser = async () => {
  const result = await LoggedUserInfo.find();
  return result;
};

export const loggedUserServices = {
  createLoggedUserInfo,
  deleteLoggedUserInfo,
  getLoggedUser,
};

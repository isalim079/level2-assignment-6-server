import { TLoginUser } from "../auth/auth.interface";
import LoggedUserInfo from "./loggedUser.model";

const createLoggedUserInfo = async (userData: TLoginUser) => {
  const result = await LoggedUserInfo.create(userData);
  return result;
};

export const loggedUserServices = {
  createLoggedUserInfo,
  };
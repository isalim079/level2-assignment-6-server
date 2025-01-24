import { TLoginUser } from "../auth/auth.interface";
import LoggedUserInfo from "./loggedUser.model";

const createLoggedUserInfo = async (userData: TLoginUser) => {
  const result = await LoggedUserInfo.create(userData);
  return result;
};

const deleteLoggedUserInfo = async(id: string) => {
    console.log(id);
    const result = await LoggedUserInfo.deleteOne({ _id: id });
    return result
}

export const loggedUserServices = {
  createLoggedUserInfo,
  deleteLoggedUserInfo
  };
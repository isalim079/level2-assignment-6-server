import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async(userData: TUser) => {
    const result = await User.create(userData)
    return result
}

const getAllUserFromDB = async () => {
    const result = await User.find()
    console.log(result);
    return result
}

export const userServices = {
    createUserIntoDB,
    getAllUserFromDB
}
import { Types } from "mongoose";
import { TFollowerInfo, TSubscriptionInfo, TUser } from "./user.interface";
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

const updateUserInfo = async (email: string, updateInfo: Partial<TUser>) => {
  const result = await User.updateOne({email: email}, updateInfo, {new: true})
  return result
}

const getMeFromDB = async(email: string) => {
  const result = await User.findOne({email: email})
  return result
}

const updateUserType = async(email: string, userType: string) => {
  const updateUserType = await User.findOneAndUpdate({email: email}, {$set: {userType: userType}}, {new: true})
  return updateUserType
}

const createSubscriptionInfo = async(email: string, subscriptionInfo: TSubscriptionInfo) => {
  const result = await User.findOneAndUpdate({email: email}, {$set: {subScriptionInfo: subscriptionInfo}} , {new: true})
  return result
}

const createFollowersData = async (id: string, followersInfo: TFollowerInfo) => {
  const objectId = new Types.ObjectId(id);
  const followersId = await User.findById(objectId);

  const existingFollowers = followersId?.followers?.find(
    (followers) => followers.email === followersInfo.email
  );

  if (!existingFollowers) {
    const result = await User.findOneAndUpdate(
      { _id: objectId },
      { $push: { followers: followersInfo } },
      { new: true }
    );
    return result;
  }

  if (existingFollowers) {
    const result = await User.findOneAndUpdate(
      { _id: objectId, "upvote.email": followersInfo.email },
      { $set: { "followers.$.following": followersInfo.following } },
      { new: true }
    );
    return result;
  }
};

const deleteFollowersData = async(userId: string, followerId: string) => {
  const updateFollowersData = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followers: { _id: followerId } },
      },
      { new: true }
    );
  
    return updateFollowersData;
}

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getEmailFromUsers,
  resetPassword,
  updateUserInfo,
  getMeFromDB,
  updateUserType,
  createSubscriptionInfo,
  createFollowersData,
  deleteFollowersData
};

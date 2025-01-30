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
  const result = await User.find().select("email").select("followers");
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

const createFollowersData = async (userEmail: string, followersInfo: TFollowerInfo) => {
  
  const followersEmail = await User.findOne({email: userEmail});

  const existingFollowers = followersEmail?.followers?.find(
    (followers) => followers.email === followersInfo.email
  );

  if (!existingFollowers) {
    const result = await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { followers: followersInfo } },
      { new: true }
    );
    return result;
  }

  if (existingFollowers) {
    const result = await User.findOneAndUpdate(
      { email: userEmail, "followers.email": followersInfo.email },
      { $set: { "followers.$.following": followersInfo.following } },
      { new: true }
    );
    return result;
  }
};

const deleteFollowersData = async(userEmail: string, followerEmail: string) => {
  const updateFollowersData = await User.findOneAndUpdate(
      {email: userEmail},
      {
        $pull: { followers: { email: followerEmail } },
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

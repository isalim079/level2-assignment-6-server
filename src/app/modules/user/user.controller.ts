import { RequestHandler } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await userServices.createUserIntoDB(userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsersFromDB = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB();
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No User Found",
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getEmailFromUsersDB = catchAsync(async (req, res) => {
  const result = await userServices.getEmailFromUsers();
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Email Found",
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Emails retrieved successfully",
    data: result,
  });
});

const resetPassword= catchAsync(async (req, res) => {
  // const {email} = req.query;
  const {email, password} = req.body;
  const result = await userServices.resetPassword(email, password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset password saved successfully",
    data: result,
  });
  // console.log(email, password);
})

const updateUserInfo = catchAsync(async (req, res) => {
  const {email} = req.params;
  const updateInfo = req.body;
  const result = await userServices.updateUserInfo(email, updateInfo)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Info Updated successfully",
    data: result,
  });
})

const getMeFromDB = catchAsync(async(req, res) => {
  const {email} = req.params;
  const result = await userServices.getMeFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Getting me successful",
    data: result,
  });
})

const updateUserType = catchAsync(async(req, res) => {
  const {email} = req.params
  const {userType} = req.body
  const result = await userServices.updateUserType(email, userType)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user type updated",
    data: result,
  });
})

const createSubscriptionInfo = catchAsync(async (req, res) => {
  const {email} = req.params
  const subscriptionInfo = req.body;
  const result = await userServices.createSubscriptionInfo(email, subscriptionInfo)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "subscription info saved",
    data: result,
  });
})

const createFollowersData = catchAsync(async(req, res) => {
   try {
      const { userEmail } = req.params;
      const followersInfo = req.body;
      const result = await userServices.createFollowersData(userEmail, followersInfo);
  
      res.status(200).json({
        success: true,
        message: "Followers info saved successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
})

const deleteFollowersData = catchAsync(async (req, res) => {
    const { userEmail, followerEmail } = req.params;
  
      const result = await userServices.deleteFollowersData(userEmail, followerEmail);
  
      res.status(200).json({
        success: true,
        message: "Unfollowed success!",
        data: result,
      });
    
})


export const UserControllers = {
  createUser,
  getAllUsersFromDB,
  getEmailFromUsersDB,
  resetPassword,
  updateUserInfo,
  getMeFromDB,
  updateUserType,
  createSubscriptionInfo,
  createFollowersData,
  deleteFollowersData
};

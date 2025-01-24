import { Request, RequestHandler, Response } from "express";
import { loggedUserServices } from "./loggedUser.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createLoggedUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await loggedUserServices.createLoggedUserInfo(userData);

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

const deleteLoggedUserInfo = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const result = await loggedUserServices.deleteLoggedUserInfo(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
};

const getLoggedUser = catchAsync(async (req, res) => {
  const result = await loggedUserServices.getLoggedUser();
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

export const loggedUserController = {
  createLoggedUserInfo,
  deleteLoggedUserInfo,
  getLoggedUser
};

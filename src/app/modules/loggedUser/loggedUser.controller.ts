import { Request, RequestHandler, Response } from "express";
import { loggedUserServices } from "./loggedUser.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

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

export const loggedUserController = {
  createLoggedUserInfo,
  deleteLoggedUserInfo
};

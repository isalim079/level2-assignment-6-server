import { RequestHandler } from "express";
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

export const loggedUserController = {
   createLoggedUserInfo
  };

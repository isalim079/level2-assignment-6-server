import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/user/user.interface";
import { NextFunction, Request, Response } from "express";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    
    // const token = bearerToken?.split(" ")[1];
    // console.log(token);

    if (!bearerToken) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
        // error: '',
      });
      return;
    }

    // check if the token is valid
    jwt.verify(
      bearerToken,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
            // error: '',
          });
        }

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(role)) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
            // error: '',
          });
        }

        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;

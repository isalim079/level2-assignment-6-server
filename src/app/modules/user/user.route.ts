import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/register",
  validationRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

router.get("/api/users", auth("admin"), UserControllers.getAllUsersFromDB);

router.get("/api/users/email", UserControllers.getEmailFromUsersDB);

export const UserRoutes = router;

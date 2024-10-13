import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post(
  "/register",
  validationRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

router.get('/api/users', UserControllers.getAllUsersFromDB)

export const UserRoutes = router;

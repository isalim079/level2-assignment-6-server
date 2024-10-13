import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;

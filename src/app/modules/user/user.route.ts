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
router.post('/reset-password', UserControllers.resetPassword)
router.put("/api/users/:email", UserControllers.updateUserInfo)
router.get("/api/getMe/:email", auth('user', 'admin'), UserControllers.getMeFromDB)
router.patch("/api/users/:email/userType",  UserControllers.updateUserType)
router.patch("/api/users/:email/subscriptionInfo",  UserControllers.createSubscriptionInfo)
router.patch("/api/users/:id/followers", UserControllers.createFollowersData);
router.delete("/api/users/:userId/followers/:followerId", UserControllers.deleteFollowersData);

export const UserRoutes = router;

import express from "express";
import { loggedUserController } from "./loggedUser.controller";
const router = express.Router();

router.post("/loggedUserInfo", loggedUserController.createLoggedUserInfo);
router.delete("/loggedUserInfo", loggedUserController.deleteLoggedUserInfo);
router.get("/loggedUserInfo", loggedUserController.getLoggedUser);

export const loggedUserInfoRoute = router;

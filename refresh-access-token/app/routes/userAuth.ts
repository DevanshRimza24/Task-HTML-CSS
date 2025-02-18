import { Router } from "express";
import { loginUserProfile } from "../controller/userController";
const userAuthRouter : Router = Router();

userAuthRouter.post("/login-user",loginUserProfile);
// userAuthRouter.post("/logout-user",logoutUserProfile);



export default userAuthRouter;
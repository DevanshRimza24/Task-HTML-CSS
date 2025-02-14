import { Router } from "express";
import { loginUserProfile } from "../controller/userController";
const userAuthRouter : Router = Router();

userAuthRouter.post("/login-user",loginUserProfile);


export default userAuthRouter;
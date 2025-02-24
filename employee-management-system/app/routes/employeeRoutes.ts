import { Router } from "express";
import { loginEmployeeProfile } from "../controller/employeeAuthController";
const employeeAuthRouter : Router = Router();

employeeAuthRouter.post("/login-employee-profile", loginEmployeeProfile);
// userAuthRouter.post("/logout-employee-profile", logoutEmployeeProfile);



export default employeeAuthRouter;
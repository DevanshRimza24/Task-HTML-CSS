import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { loginEmployee } from "../services/employeeAuthServices"


export const loginEmployeeProfile = async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email, departmentId } = req.body;
      const { accessToken, refreshToken, employee } = await loginEmployee(email, departmentId);
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

      DefaultResponse( res , 200 , 'User Logged In Successfully' , { accessToken, employee}, null);

    //   sendResponse(true, "Login successful", res, 200, { accessToken, user });
    } catch (error) {
    //   sendResponse(false, error.message, res, 401);
    // DefaultResponse( res , 400 , 'error.message' , null, null);
    next(error);
    }
  };


  export const logoutEmployeeProfile = async (req : Request, res : Response) => {
    (req as any).token = null;
    DefaultResponse( res , 200 , 'User Logged Out Successfully' , null, null);
}

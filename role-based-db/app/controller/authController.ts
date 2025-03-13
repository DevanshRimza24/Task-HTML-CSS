import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/authServices";
import CustomError from "../errorHandler/customError";
import { UserRepository } from "../repository/userRepository"
import defaultResponse from "../helper/validatorFunctions";

const userRepository = new UserRepository();
export const register = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { email, password, role } = req.body

    if (role=="ADMIN") throw new CustomError("Only Developer can create ADMIN",404)
    console.log(1)
    const user = await registerUser(email,password,role);
    console.log(2)
    res.status(201).json(user);
  } catch (error: any) {
    next()
    // res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {

    const { email, password} = req.body
    const user = await userRepository.getUserByEmail(email);
      if (!user) throw new Error("User not found");

    const accessToken = await loginUser(email, password);
    // res.json({ token });
    defaultResponse(res, 200, 'User Logged In Successfully', { accessToken, user }, null);


  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

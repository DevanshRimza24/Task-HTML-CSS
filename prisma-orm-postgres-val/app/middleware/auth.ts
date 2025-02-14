import { body, param} from "express-validator";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import defaultResponse from "../helper/validatorFuntion";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
   const token = req.header("Authorization")?.replace("Bearer ", "");
   if(!token) {
    defaultResponse( res , 200 , 'Access denied, No token provided ' , null, null);
    return;
   }

   try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next()


   } catch (error) {
    defaultResponse( res , 400 , 'Invalid Token ' , null, null);

   }
} 


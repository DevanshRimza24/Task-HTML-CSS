import { body, param} from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../repository/userRepository";

import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import DefaultResponse from "../helper/defaultResponseFunction";
import CustomError from "../errorHandler/customError";
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const employeeAuth = (req: Request, res: Response, next: NextFunction) => {
   const token = req.header("Authorization")?.replace("Bearer ", "");
   if(!token) {
    throw new CustomError("Access denied, No token provided",404)
    return;
   }

   try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next()
   } catch (error : any) {
   
         if(error.name === 'TokenExpiredError'){
         console.log("Hello");

         const decoded = jwt.decode(token) as JwtPayload;

        prisma.refreshToken.findFirst({
            where: { employeeId: decoded.id },
          }).then((storedRefreshToken) => {
            if (!storedRefreshToken || new Date() > storedRefreshToken?.expiresAt) {
               throw new CustomError("Invalid or expired refresh token",404);
             }
          })

         const newAccessToken= jwt.sign( {id : decoded.id , email : decoded.email} , JWT_SECRET, {expiresIn: "2min"});
          
         DefaultResponse( res , 200 , 'User Logged In Successfully' , { newAccessToken, decoded}, null);



         }
         

         


    // DefaultResponse( res , 400 , 'Invalid Token ' , null, null);
    throw new CustomError("Invalid Token",404)
   }
} 


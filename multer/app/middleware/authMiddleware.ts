import { Request, Response, NextFunction } from "express";
import CustomError from "../errorHandler/customError";
const jwt = require('jsonwebtoken')
import defaultResponse from "../helper/validatorFunctions";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1]
    

    try {
        
        // const token = req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token)
        if (!token) {
            // throw new CustomError("Access denied, No token provided", 401)
            throw new Error("Access denied, No token provided")
            // defaultResponse( res , 400 , 'Access denied, No token provided ' , null, null);
        }
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string; role: string }

        console.log(decoded);

        (req as any).user = decoded

        next()
    } catch (error) {
        // next(error)
        defaultResponse(res, 400, 'Access denied, Admins only', null, error);

    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
   
        if ((req as any).user?.role !== "ADMIN") {
            // throw new CustomError("Access denied, Admins only", 401)
            // return res.status(400).json({success : false, message : "Access denied, Admins only"})
            // throw new Error("Access denied, Admins only")
            // defaultResponse(res, 400, 'Access denied, Admins only', null, null);
            defaultResponse(res, 412, 'Access denied, Admins only', null, null);
        }
        else {
            next()
        }
    
        
   
    

}

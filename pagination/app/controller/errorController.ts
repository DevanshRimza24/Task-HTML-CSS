import { Request, Response, NextFunction } from "express";
import  CustomError  from "../errorHandler/customError";

export const errorHandler = (error : CustomError, req : Request, res : Response, next : NextFunction) => {
    
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
       status : error.statusCode,
       message : error.message
  })
}
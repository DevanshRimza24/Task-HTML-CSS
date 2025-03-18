import { Request, Response, NextFunction } from "express";
import CustomError from "../errorHandler/customError";

export const noRouteFound = (req : Request, res : Response, next : NextFunction ) => {
        const err = new CustomError(`Cant find ${req.originalUrl} on server`, 404);
        next(err);
       }

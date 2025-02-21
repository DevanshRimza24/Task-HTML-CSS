import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { checkValidationResult } from "../helper/validatorFunction";
import CustomError from "../errorHandler/customError";
import prisma from "../../prisma/index"


export const createEmployeeAttendance = async (req: Request, res: Response, next : NextFunction) => {

    try {
        const error = checkValidationResult(req);
        const { name, dateOfBirth, gender, contactNumber, email, departmentId } = req.body;
        const department = await prisma.department.findUnique({
            where: {
                id : departmentId
            },
        })
        
        if(!department) {
          throw new CustomError("Department with provided Id does not exists", 400);
        }

        const employee = await createAttendance(name, dateOfBirth, gender, contactNumber, email, departmentId);
        
        // res.status(200).json(department);
        DefaultResponse(res, 200, 'Employee Profile Created Successfully', employee, null);
    } 
    catch(error) {
        next(error);
    }   
}
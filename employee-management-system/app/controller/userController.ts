import { createEmployee, createDepartment } from "../services/userServices";
import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { checkValidationResult } from "../helper/validatorFunction";
import CustomError from "../errorHandler/customError";
export const createEmployeeProfile = (req: Request, res: Response) => {
    const { name, dateOfBirth, gender, contactNumber, email, departmentId } = req.body;

}

export const createDepartmentTable = async (req: Request, res: Response, next : NextFunction) => {

    try{
        const error = checkValidationResult(req);
        const { departmentName, location } = req.body;
        console.log(departmentName)
        const department = await createDepartment(departmentName, location);
        // res.status(200).json(department);
        DefaultResponse(res, 200, 'Department Created Successfully', department, null);
    } 
    catch (error) {
        // console.log(error)
        // const err = new CustomError(".....", 404);
       next(error);
        
    }
    
}
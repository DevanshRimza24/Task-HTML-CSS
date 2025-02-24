import { createEmployee, createDepartment, getDepartments } from "../services/departmentServices";
import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { checkValidationResult } from "../helper/validatorFunction";
import CustomError from "../errorHandler/customError";


export const createDepartmentTable = async (req: Request, res: Response, next : NextFunction) => {

    try{
        const error = checkValidationResult(req);
        const { departmentName, location } = req.body;
        const department = await createDepartment(departmentName, location);
        DefaultResponse(res, 200, 'Department Created Successfully', department, null);
    } 
    catch (error) {
       next(error); 
    }
    
}

export const getDepartmentDetails = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const departments = await getDepartments();
        
        DefaultResponse( res , 200 , 'Department details fetched Successfully' , departments, null);


    } catch (error) {
        next(error);

    }
}
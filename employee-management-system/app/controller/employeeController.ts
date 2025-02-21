import { createEmployee } from "../services/employeeServices";
import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { checkValidationResult } from "../helper/validatorFunction";
import CustomError from "../errorHandler/customError";
import prisma from "../../prisma/index"

export const createEmployeeProfile = async (req: Request, res: Response, next : NextFunction) => {

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

        const employee = await createEmployee(name, dateOfBirth, gender, contactNumber, email, departmentId);
        
        // res.status(200).json(department);
        DefaultResponse(res, 200, 'Employee Profile Created Successfully', employee, null);
    } 
    catch(error) {
        next(error);
    }   
}

export const getEmployeesProfiles = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const departments = await getEmployees();
        
        DefaultResponse( res , 200 , 'Department details fetched Successfully' , departments, null);


    } catch (error) {
        // res.status(400).json({ error: "Error getting users" });
        next(error);

    }
}
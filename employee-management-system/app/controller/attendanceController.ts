import { NextFunction, Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
import { checkValidationResult } from "../helper/validatorFunction";
import CustomError from "../errorHandler/customError";
import prisma from "../../prisma/index"
import { createAttendance, getAttendance, getAttendanceFromId } from "../services/attendanceServices";


export const createEmployeeAttendance = async (req: Request, res: Response, next : NextFunction) => {
    
    try {
        const error = checkValidationResult(req);
        const { employeeId, date, checkInTime, checkOutTime } = req.body;
        const isEmployeeIdExists = await prisma.employee.findUnique({
            where: {
                id : employeeId
            },
        })
        
        if(!isEmployeeIdExists) {
          throw new CustomError("Employee with provided Id does not exists", 400);
        }

        const attendance = await createAttendance(employeeId, date, checkInTime, checkOutTime);
        
        DefaultResponse(res, 200, 'Attendance details added Successfully', attendance, null);
    } 
    catch(error) {
        next(error);
    }   
}


export const getEmployeesAttendance = async (req: Request, res: Response, next : NextFunction) => {
    try {

        const attendance = await getAttendance();
        
        DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , attendance, null);


    } catch (error) {
        next(error);
    }
}

export const getEmployeesAttendanceFromId = async (req: Request, res: Response, next : NextFunction) => {
    try {
        
        const {employeeId} = req.params
        const attendance = await getAttendanceFromId(employeeId);
        if(attendance.length==0) {
            throw new CustomError("Attendance with provided Employee Id does not exists", 400);
        }
        DefaultResponse( res , 200 , 'Employee Attendance fetched Successfully' , attendance, null);


    } catch (error) {
        next(error);

    }
}
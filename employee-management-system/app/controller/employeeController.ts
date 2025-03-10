import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from "../services/employeeServices";
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


export const updateEmployeeProfile = async (req: Request, res: Response, next : NextFunction) => {
    try {
        console.log(req.query);
        const error = checkValidationResult(req);
        const { id } = req.query;
        // const idNum = parseInt(id);
        const { name, dateOfBirth, gender, contactNumber, email } = req.body;


        const employeeExists = await prisma.employee.findUnique({
            where: {
                id : id as string
            },
        })
        if (!employeeExists) {
            throw new CustomError("Employee does not exists", 400);
        }

        const employeeByEmail = await prisma.employee.findMany({
            where : {
                email,
            },
        })
        if (employeeByEmail) {
            throw new CustomError("Employee already exists", 400);
        }



        const updatedEmployee = await updateEmployee(id as string, name, dateOfBirth, gender, contactNumber, email);
        // res.status(200).json(updatedUser);
        // sendResponse(true, "User Updated Successfully", res, 200, updatedUser);
        DefaultResponse( res , 200 , 'User Updated Successfully' , updatedEmployee, null);

    } catch (error) {
        // res.status(400).json({ error: error });
        next(error)

    }

};



export const getEmployeesProfiles = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const employees = await getEmployees();
        
        DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , employees, null);


    } catch (error) {
        // res.status(400).json({ error: "Error getting users" });
        next(error);

    }
}

export const deleteEmployeeProfile = async (req: Request, res: Response, next : NextFunction) => {
    try {
        checkValidationResult(req);
        const { id } = req.params;
        // const idNum = parseInt(id);
        const employee = await prisma.employee.findUnique({
            where: {
                id
            },
        })
        if (!employee) {
            throw new CustomError("Employee does not exists",404)
        }


        const employeeAttendance = await prisma.attendance.findMany({
            where: {
                id
            },
        })

        if(employeeAttendance.length!=0) {
            const updateAttendance = await prisma.attendance.updateMany({
                where: {
                  employeeId : id
                },
                data: {
                  isDeleted: true
                },
              })
        }

        




        const deletedUser = await deleteEmployee(id);
        // sendResponse(true, "User Deleted Successfully", res, 200);
        DefaultResponse( res , 200 , 'Employee Deleted Successfully' , null, null);

        // res.status(200).json("User deleted successfully");
    } catch (error) {
        // res.status(400).json({ error: error });
        // defaultResponse( res , 400 , 'error in deleting account' , null, error);
        next(error)

    }

};
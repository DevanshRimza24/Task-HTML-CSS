import { createEmployee, createDepartment } from "../services/userServices";
import { Request, Response } from "express";
import DefaultResponse from "../helper/defaultResponseFunction";
export const createEmployeeProfile = (req: Request, res: Response) => {
    const { name, dateOfBirth, gender, contactNumber, email, departmentId } = req.body;

}

export const createDepartmentTable = async (req: Request, res: Response) => {
    const { departmentName, location } = req.body;
    const department = await createDepartment(departmentName, location);
    // res.status(200).json(department);
    DefaultResponse(res, 200, 'User Created Successfully', department, null);
}
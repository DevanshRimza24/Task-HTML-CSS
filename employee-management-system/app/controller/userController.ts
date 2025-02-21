import { createEmployee, createDepartment } from "../services/userServices";
import { Request, Response } from "express";

export const createEmployeeProfile = (req: Request, res: Response) => {
    const { name, dateOfBirth, gender, contactNumber, email, departmentId } = req.body;

}

export const createDepartmentTable = async (req: Request, res: Response) => {
    const { departmentName, location } = req.body;
    const department = await createDepartment(departmentName, location);
    res.status(200).json(department);
    // defaultResponse(res, 200, 'User Created Successfully', addedUser, null);
}
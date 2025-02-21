import { Gender } from "@prisma/client";
import prisma from "../repository/employeeRepository";


export const createEmployee = async (name : string, dateOfBirth : Date, gender : Gender, contactNumber : number, email : string, departmentId : string) => {
    const employee = await prisma.employee.create({
        data: {
            name, 
            dateOfBirth : new Date(dateOfBirth), 
            gender, 
            contactNumber, 
            email, 
            departmentId
        },
      })
      return employee; 
}

export const getEmployees = async () => {
    return await prisma.department.findMany();
}

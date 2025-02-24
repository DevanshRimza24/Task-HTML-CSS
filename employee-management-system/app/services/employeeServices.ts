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

export const updateEmployee = async (id : string, name : string, dateOfBirth : Date, gender : Gender, contactNumber : number, email : string) => {
    // console.log(id,name, email);
  return await prisma.employee.update({
    where : {id},
    data : {
         name,
         dateOfBirth : new Date(dateOfBirth),
         gender,
         contactNumber,
         email,
        },
        
  });
};

export const getEmployees = async () => {
    return await prisma.employee.findMany();
}



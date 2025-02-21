// import prisma from "../repository/userRepository";
import prisma from "../../prisma/index";
export const createEmployee = () => {

}

export const createDepartment = async (departmentName : string, location : string) => {
    const department = await prisma.department.create({
        data: {
          departmentName,
          location
        },
      })
      return department; 
}

export const getDepartments = async () => {
    return await prisma.department.findMany();
}
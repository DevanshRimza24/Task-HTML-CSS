import prisma from "../repository/employeeRepository";
import CustomError from "../errorHandler/customError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const REFRESH_EXPIRES_DAYS =  "7" as string;


export const generateTokens = async (employeeId : string , email : string) => {

    const accessToken= jwt.sign( {employeeId , email} , JWT_ACCESS_SECRET, {expiresIn: "5min"});
    const refreshToken= jwt.sign( {employeeId , email} , JWT_REFRESH_SECRET, {expiresIn: "1d"});
  
    return { accessToken, refreshToken};
  
  }

  export const storeRefreshToken = async (employeeId: string, refreshToken: string) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
  
    await prisma.refreshToken.create({
      data: {
        employeeId,
        token: refreshToken,
        expiresAt,
      },
    });
  };


  export const loginEmployee = async (email: string, departmentId: string) => {

    const employee = await prisma.employee.findFirst({
    //   where: { email, isDeleted: false },
    where: { email },

    });
  
    if (!employee) throw new CustomError("User not found",404);
  
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    if(employee.departmentId!=departmentId) {
        throw new CustomError("Invalid Department Id", 404);
    }

  
    const { accessToken, refreshToken } =await generateTokens(employee.id, employee.email);
                                          
    await storeRefreshToken(employee.id, refreshToken);
  
    return { accessToken, refreshToken, employee: { id: employee.id, name: employee.name, dateOfBirth: employee.dateOfBirth, gender: employee.gender, contactNumber: employee.contactNumber, email: employee.email } };
  };                               
                                                                // dateOfBirth, gender, contactNumber, email
import prisma from "../repository/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginUser = async (email : string, password : string) => {

  const user = await prisma.user.findFirst({
    where: {
      email,
      isDeleted: false,
    }
  })

  if(!user) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    throw new Error("Incorrrect Password");
  }

  const token= jwt.sign({ userId : user.id, email : user.email}, JWT_SECRET, {expiresIn: "1d"});

// const refreshToken = 


  return {token, user: { id : user.id, name: user.name, email: user.email,}};
}


export const createUser = async (name : string, email : string, password : string) => {
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password : hashedPassword,
        },
        select : {
          id : true,
         name : true,
         email : true,
        }
      })

      return user;
}


export const updateUser = async (id : number, name: string, email: string, password: string, isDeleted?: boolean) => {
    // console.log(id,name, email);
    const hashedPassword = await bcrypt.hash(password,10);
  return await prisma.user.update({
    where : {id},
    data : {
         name,
         email,
         password : hashedPassword, 
         isDeleted
        },
        select : {
          id : true,
         name : true,
         email : true,
        }
  });
};
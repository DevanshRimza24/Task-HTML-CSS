import prisma from "../repository/userRepository";
import bcrypt from "bcryptjs";




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
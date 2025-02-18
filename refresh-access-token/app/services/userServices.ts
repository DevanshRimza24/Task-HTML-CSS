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
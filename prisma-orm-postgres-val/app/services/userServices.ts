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
      })

      return user;
}


export const getUsers = async () => {
    return await prisma.user.findMany();
};

export const updateUser = async (id : number, name: string, email: string) => {
    console.log(id,name, email);

  return await prisma.user.update({
    where : {id},
    data : {
         name,
         email 
        },
  });
};


export const deleteUser = async (id : number) => {
    // console.log(id);

  return await prisma.user.delete({
    where : {id},
  });
};
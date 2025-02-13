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


export const getUsers = async () => {
    return await prisma.user.findMany({
      where : {isDeleted: false},
      select : {id : true, name: true, email: true},
    });




};

export const updateUser = async (id : number, name: string, email: string, password: string, isDeleted?: boolean) => {
    console.log(id,name, email);

  return await prisma.user.update({
    where : {id},
    data : {
         name,
         email,
         password, 
         isDeleted
        },
        select : {
          id : true,
         name : true,
         email : true,
        }
  });
};


export const deleteUser = async (id : number) => {
    // console.log(id);

  return await prisma.user.update({
    where : {id},
    data : {
      isDeleted : true
  },
  });
};
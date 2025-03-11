import prisma from "../repository/imageRepository"


export const createUser = async (userName : string, password : string, role : "USER" | "ADMIN") => {
    return await prisma.user.create({
        data : { userName, password, role}
    })
    }
    
    export const findUserByUserName = async (userName : string) => {
      return await prisma.user.findUnique({
        where : {
            userName
        }
      })
    }
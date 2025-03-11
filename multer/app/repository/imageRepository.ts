import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveImage = async (name : string, imageUrl : string, userId : string) => {
return await prisma.image.create({
    data : { name, imageUrl, userId}
})
}

export const getAllImages = async () => {
  return await prisma.image.findMany()
}



export default prisma;
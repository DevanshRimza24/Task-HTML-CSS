import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveImage = async (name : string, imageUrl : string) => {
return await prisma.image.create({
    data : { name, imageUrl}
})
}

export const getAllImages = async () => {
  return await prisma.image.findMany()
}



export default prisma;
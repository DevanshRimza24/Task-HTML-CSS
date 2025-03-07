import CustomError from "../errorHandler/customError"
import prisma from "../repository/imageRepository"
import { saveImage, getAllImages } from "../repository/imageRepository"



export const uploadImage = async (file: Express.Multer.File) => {

    if (!file) throw new CustomError("File not provided", 400)
    return await saveImage(file.originalname, `/uploads/${file.filename}`)


}


export const fetchImage = async () => {

    
    return await getAllImages()


}

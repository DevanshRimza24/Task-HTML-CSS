import { NextFunction, Request, Response } from "express";
import { uploadImage, fetchImage } from "../sevices/imageServices";
import defaultResponse from "../helper/validatorFunctions";


export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {

    try {
console.log(1)
        const image = await uploadImage(req.file as Express.Multer.File, (req as any).user?.userId);
        console.log(2)
        // res.send(image)
        defaultResponse(res, 200, 'Image Added Successfully', image, null);
        console.log(3)
    } catch (error) {
        // next(error);
        console.log('---------------',error)
        //defaultResponse(res, 400, 'Image not Added Successfully', null, error);

    }
};



export const getImageController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const images = await fetchImage();

        // res.send(images)
        defaultResponse(res, 200, 'Images fetched Successfully', images, null);

    } catch (error) {
        next(error);
    }
};
import { NextFunction, Request, Response } from "express";
import { uploadImage, fetchImage } from "../sevices/imageServices";



export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const image = await uploadImage(req.file as Express.Multer.File);

        res.send(image)
        // defaultResponse(res, 200, 'User Logged In Successfully', { accessToken, user }, null);

    } catch (error) {
        next(error);
    }
};



export const getImageController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const images = await fetchImage();

        res.send(images)
        // defaultResponse(res, 200, 'User Logged In Successfully', { accessToken, user }, null);

    } catch (error) {
        next(error);
    }
};
// import { validationResult } from "express-validator";
const { validationResult } = require("express-validator");

import { Request } from "express";
import CustomError from "../errorHandler/customError";



export const checkValidationResult = (req: Request) => {
    const errors = validationResult(req);
    // console.log(errors.errors[0].msg);
    if (!errors.isEmpty()) {
        // const validationError = {
        //     status: 400,
        //      message: errors.errors[0].msg
        // };
        throw new CustomError(errors.errors[0].msg,400);
        // throw validationError;
        // const [{ msg }] = errors.error;
        // res.status(400).json({error : errors.map(({ msg }) => msg)});
    }
};
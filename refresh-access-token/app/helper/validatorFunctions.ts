// import { validationResult } from "express-validator";
const { validationResult } = require("express-validator");
import { Request, Response } from "express";

export const checkValidationResult = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validationError = {
            status: 400,
            message: errors.errors[0].msg,
        };
        throw validationError;
        
    }
};


function defaultResponse(
    res : Response,
    status : number,
    msg : string ,
    data ? : any,
    err ? : any,
){
    return res.status(status).json({
        status : status ,
        message : msg,
        data : data || null ,
        err : err || null
    })
}
export default defaultResponse;



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
        // const [{ msg }] = errors.error;
        // res.status(400).json({error : errors.map(({ msg }) => msg)});
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


// export interface defaultResponse {
//     success: boolean,
//     message: string,
//     data?: any,
//     errors?: any,
// }

// export const sendResponse = (success: boolean, message: string, res: any, statusCode: number,data:any = null, errors: any = null) : void => {
// const response : defaultResponse = {success, message};

// if(data) response.data = data;
// if(errors) response.errors = errors;

// res.status(statusCode).json(response);
// }


// export const checkValidation = (req: Request) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const validationError = {
//         status: 400,
//         message: errors.errors[0].msg,
//       };
//       throw validationError;
//     }
//   };


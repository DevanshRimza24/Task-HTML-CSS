import { Response } from "express"



function DefaultResponse(

    res : Response,
    status : number,
    msg : string,
    data ?: any,
    err ?: any

) {
  return res.status(status).json({
    status : status ,
        message : msg,
        data : data || null ,
        err : err || null
  })  
}

export default DefaultResponse;


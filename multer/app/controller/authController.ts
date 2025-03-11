import {Request, Response, NextFunction } from "express";
import { createUser, findUserByUserName } from "../sevices/userServices";
const bcrypt = require('bcrypt')
import defaultResponse from "../helper/validatorFunctions";
import CustomError from "../errorHandler/customError";
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY as string;

export const signUp = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { userName, password, role} =req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await createUser(userName, hashedPassword, role)

     defaultResponse(res, 200, 'Image Added Successfully', user, null);
    } catch(error) {
         next(error)
    }
}


export const login = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { userName, password } =req.body

        const user = await findUserByUserName(userName)

        if(!user) {
            // throw new CustomError("Invalid Credentials",400)
            //  res.status(400).json({success : false, message : "Invalid Credentials"})
            // defaultResponse(res, 400, 'Invalid Credentials', null, null);
            throw new Error("Invalid Credentials")
        }

        const validPassword =await bcrypt.compare(password, user?.password)
        if(!validPassword) {
            // throw new CustomError("Invalid Credentials...",400)
            //  res.status(400).json({success : false, message : "Invalid Credentials..."})
            // defaultResponse(res, 400, 'Invalid Credentials', null, null);
            throw new Error("Invalid Credentials...")
        }

        const token = jwt.sign({userId : user?.id, role : user?.role}, SECRET_KEY, {expiresIn: "1h"})

        defaultResponse(res, 200, 'Logged In Successfully', {token, user}, null);
    } catch(error) {
        //  next(error)
        defaultResponse(res, 500, 'Login Error', null, error)
        // res.status(400).json({success : false, message : "Login Error"})
    }
}


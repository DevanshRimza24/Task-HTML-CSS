import { NextFunction } from "express-serve-static-core";
import { createUser, getUsers } from "../services/userServices";
import mockData from "../../mockData";
import { Request, Response } from "express-serve-static-core";
import DefaultResponse from "../helper/defaultResponseFunction";
import prisma from "../repository/userRepository";
export const addUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // const { stockSymbol, firstName, lastName, email, gender } = req.body
        console.log(1)
        const addedUser = mockData.forEach(async (mock) => {
            await createUser(mock.stockSymbol, mock.firstName, mock.lastName, mock.email, mock.gender, mock.language)
        });
        // const addedUser = await createUser(stockSymbol, firstName, lastName, email, gender)
        console.log(addedUser)
        DefaultResponse(res, 200, 'User Profile Created Successfully', addedUser, null);

    }
    catch (error) {
        next(error)
    }


}


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // const { stockSymbol, firstName, lastName, email, gender } = req.body
        const { skip } = req.params
        const skipInt = parseInt(skip)

        const { title, sortIn, input } = req.query
        // const title = "firstName"
        // const sortIn = "asc"

        if(input !== '') {
            const users = await getUsers(skipInt, title as string, sortIn as string, input as string)
            DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , users, null)
        }
        else {
            const users = await getUsers(skipInt, title as string, sortIn as string)

        
        
            DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , users, null)
        }
       
       
        
        

    }
    catch (error) {
        next(error)
    }


}
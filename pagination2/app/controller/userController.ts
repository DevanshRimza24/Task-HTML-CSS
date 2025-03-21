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
        // const { page } = req.params
        // const pageInt = parseInt(page)

        const {page, title, sortIn, input, pageSize } = req.query
        const pageInt = parseInt(page as string)
        // const title = "firstName"
        // const sortIn = "asc"
        const ps = parseInt(pageSize as string)

        if(input !== '') {
            const users = await getUsers(pageInt, ps , title as string, sortIn as string, input as string)
            DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , users, null)
        }
        else {
            const users = await getUsers(pageInt, ps , title as string, sortIn as string)

        
        
            DefaultResponse( res , 200 , 'Employees Profiles fetched Successfully' , users, null)
        }
       
       
        
        

    }
    catch (error) {
        console.log(error)
        next(error)
    }


}
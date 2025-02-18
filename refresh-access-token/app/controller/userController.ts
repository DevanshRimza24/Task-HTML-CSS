import { createUser, updateUser} from "../services/userServices";
import { Request, Response } from "express";
import prisma from "../repository/userRepository";
import { checkValidationResult } from "../helper/validatorFunctions";
import defaultResponse from "../helper/validatorFunctions";

export const signUpUserProfile = async (req : Request, res : Response) => {
    try {
        const error = checkValidationResult(req);

        const { name, email, password } = req.body;
        const user = await prisma.user.findMany({
            where: {
                email,
                // isDeleted: false,
            },
        })
        if (user[0]?.isDeleted==false) {

            const validationError = {
                status: 400,
                message: "Email already exist",
            };
            throw validationError;
        }else if(user[0]?.isDeleted==true){
            const id= user[0].id;
            console.log(id);
            const updatedUser = await updateUser(id, name, email, password, false);
            defaultResponse( res , 200 , 'User Created Successfully' , updatedUser, null);
        }else {
            const addedUser = await createUser(name, email, password);
            defaultResponse( res , 200 , 'User Created Successfully' , addedUser, null);
        }
        // res.status(404).json({error : "Email already exist"});


        

        // sendResponse(true, "User Created Successfully", res, 200, addedUser);
        // res.status(200).json(addedUser);
    } catch (error) {
        defaultResponse( res , 400 , 'error in creating account' , null, error);


        // defaultResponse(false, "Error creating user", error, res, 400);

        // res.status(400).json({ error: error });
        // res.status(404).json({error : "Error creating user"});
    }
}


export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        // console.log(req.params.id);
        const error = checkValidationResult(req);
        const { id } = req.params;
        const idNum = parseInt(id);
        const { name, email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: idNum,
            },
        })
        if (!user) {

            const validationError = {
                status: 400,
                message: "User does not exist",
            };
            throw validationError;
        }
        // console.log(id);

        const userByEmail = await prisma.user.findMany({
            where : {
                email,
            },
        })
        if (!userByEmail) {

            const validationError = {
                status: 400,
                message: "Email already exist",
            };
            throw validationError;
        }



        const updatedUser = await updateUser(parseInt(id), name, email, password);
        // res.status(200).json(updatedUser);
        // sendResponse(true, "User Updated Successfully", res, 200, updatedUser);
        defaultResponse( res , 200 , 'User Updated Successfully' , updatedUser, null);

    } catch (error) {
        // res.status(400).json({ error: error });
        defaultResponse( res , 400 , 'error in updating account' , null, error);

    }

};



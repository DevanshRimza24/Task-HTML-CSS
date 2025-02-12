import { userInfo } from "os";
import { Request, Response } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../services/userServices";
import prisma from "../repository/userRepository";
import { checkValidationResult } from "../helper/validatorFuntion";
import defaultResponse from "../helper/validatorFuntion";

export const addUserProfile = async (req: Request, res: Response) => {


    try {
        const error = checkValidationResult(req);

        const { name, email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (user) {

            const validationError = {
                status: 400,
                message: "Email already exist",
            };
            throw validationError;
        }
        // res.status(404).json({error : "Email already exist"});


        const addedUser = await createUser(name, email, password);
        defaultResponse( res , 200 , 'User Created Successfully' , addedUser, null);

        // sendResponse(true, "User Created Successfully", res, 200, addedUser);
        // res.status(200).json(addedUser);
    } catch (error) {
        defaultResponse( res , 400 , 'error in creating account' , null, error);


        // defaultResponse(false, "Error creating user", error, res, 400);

        // res.status(400).json({ error: error });
        // res.status(404).json({error : "Error creating user"});
    }
}



export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        // res.status(200).json(users);
        // sendResponse(true, "User Profiles fetched Successfully", res, 200, users);
        defaultResponse( res , 200 , 'User profiles fetched Successfully' , users, null);


    } catch (error) {
        // res.status(400).json({ error: "Error getting users" });
        defaultResponse( res , 400 , 'error in fetching users' , null, error);

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

        const userByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (userByEmail) {

            const validationError = {
                status: 400,
                message: "Email already exist",
            };
            throw validationError;
        }



        const updatedUser = await updateUser(parseInt(id), name, email);
        // res.status(200).json(updatedUser);
        // sendResponse(true, "User Updated Successfully", res, 200, updatedUser);
        defaultResponse( res , 200 , 'User Updated Successfully' , updatedUser, null);

    } catch (error) {
        // res.status(400).json({ error: error });
        defaultResponse( res , 400 , 'error in updating account' , null, error);

    }

};


export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        checkValidationResult(req);
        const { id } = req.params;
        const idNum = parseInt(id);
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





        const deletedUser = await deleteUser(parseInt(id));
        // sendResponse(true, "User Deleted Successfully", res, 200);
        defaultResponse( res , 200 , 'User Deleted Successfully' , null, null);

        // res.status(200).json("User deleted successfully");
    } catch (error) {
        // res.status(400).json({ error: error });
        defaultResponse( res , 400 , 'error in deleting account' , null, error);

    }

};
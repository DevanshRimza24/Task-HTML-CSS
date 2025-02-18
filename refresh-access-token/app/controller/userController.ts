import { createUser} from "../services/userServices";
import { Request, Response } from "express";
import prisma from "../repository/userRepository";


export const signUpUserProfile = async (req : Request, res : Response) => {
    const { name, email, password } = req.body;
    const user = await prisma.user.findMany({
        where: {
            email,
            // isDeleted: false,
        },
    })

    const addedUser = await createUser(name, email, password);
            // defaultResponse( res , 200 , 'User Created Successfully' , addedUser, null);
            res.status(200).send("User added successfully");
}



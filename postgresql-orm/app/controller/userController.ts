import { Request, Response } from 'express';
import {createUser, getUsers, updateUser, deleteUser } from '../services/userServices';
import { request } from 'http';


export const addUser = async (req: Request, res: Response)=> {
    try{
        // console.log(req.body);
        const {name, email} = req.body;
        // console.log(name);
        const user = await createUser(name, email);
        res.status(201).json(user);
    } catch(error){
        res.status(500).json({error : "Error creaing user"});
    }
    
  };

  export const getAllUsers = async (req : Request, res: Response) => {
    try{
        const users = await getUsers();
        res.status(201).json(users);


    }catch(error){
        res.status(500).json({error : "Error getting users"});
    }
  }


  export const updatedUser = async (req: Request, res: Response)=> {
    try{
        // console.log(req.params.id);

        const {id} = req.params;
        const {name, email} = req.body;
        // console.log(id);
        const updatedUser = await updateUser(parseInt(id), name, email);
        res.status(201).json(updatedUser);
    } catch(error){
        res.status(500).json({error : "Error updating user"});
    }
    
  };

  export const deletedUser = async (req: Request, res: Response)=> {
    try{

        const {id} = req.params;
        const {name, email} = req.body;
        // console.log(id);
        const deletedUser = await deleteUser(parseInt(id));
        res.status(201).json("User deleted successfully");
    } catch(error){
        res.status(500).json({error : "Error deleting user"});
    }
    
  };
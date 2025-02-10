import { Request, Response } from 'express';
import { getUsers, createUser } from '../services/userServices';

export const getAllUsers = (req: Request, res: Response): void => {
  const users = getUsers();
  console.log(users);
  res.status(200).json(users);
};

export const addUser = (req: Request, res: Response): void => {
  const newUser = req.body;
  const createdUser = createUser(newUser);
  res.status(201).json(createdUser);
};

import { Request, Response } from "express";
import { createUserService, getAllUsersService } from "../services/userServices";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

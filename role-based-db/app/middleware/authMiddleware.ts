import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import CustomError from "../errorHandler/customError";

interface DecodedUser {
  id: string;
  role: Role;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction)  => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new CustomError("Access denied, No token provided",400)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user?.role !== Role.ADMIN)  res.status(403).json({ error: "Only admin can perform this action" });
  else next();
};

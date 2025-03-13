import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";
import { UserRepository } from "../repository/userRepository";

const prisma = new PrismaClient();
const userRepository = new UserRepository();

export const registerUser = async (email: string, password: string, role: Role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword, role);
};

export const loginUser = async ( email: string, password: string ) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  
  return token;
};


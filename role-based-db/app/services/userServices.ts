import { PrismaClient, Role } from "@prisma/client";
import { UserRepository } from "../repository/userRepository";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const userRepository = new UserRepository();

export const createUserService = async ({ email, password, role }: { email: string; password: string; role: Role }) => {
  if (role === Role.ADMIN) throw new Error("Only the developer can create an admin");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword, role);
};

export const getAllUsersService = async () => {
  return await userRepository.getAllUsers();
};

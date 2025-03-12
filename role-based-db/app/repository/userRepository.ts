import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(email: string, password: string, role: Role) {
    return await prisma.user.create({ data: { email, password, role } });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getAllUsers() {
    return await prisma.user.findMany({ select: { id: true, email: true, role: true } });
  }
}

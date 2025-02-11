// import { Prisma } from "@prisma/client";
// import User from "../../prisma/migrations";
import { PrismaClient } from '@prisma/client';
// import prisma from "../repository/userRepository";


const prisma = new PrismaClient();

export default prisma;

// export const saveUserToRepo = (user: User): User => {
//     const newUser = { ...user, id: users.length + 1 };
//     users.push(newUser);
//     return newUser;
//   };


// Prisma.User.findMany((data) => {
// console.log(data);
// });


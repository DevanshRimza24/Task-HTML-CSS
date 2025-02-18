import prisma from "../repository/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const REFRESH_EXPIRES_DAYS =  "7" as string;

export const generateTokens = async (userId : Number, email : string) => {

  const accessToken= jwt.sign( {userId , email} , JWT_SECRET, {expiresIn: "5min"});
  const refreshToken= jwt.sign( {userId , email} , JWT_REFRESH_SECRET, {expiresIn: "1d"});

  return { accessToken, refreshToken};

}


export const storeRefreshToken = async (userId: number, refreshToken: string) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  await prisma.refreshToken.create({
    data: {
      userId,
      token: refreshToken,
      expiresAt,
    },
  });
};

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

// -------------------

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { email, isDeleted: false },
  });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const { accessToken, refreshToken } =await generateTokens(user.id, user.email);
                                        
  await storeRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const storedToken = await prisma.refreshToken.findFirst({
      where: { userId: decoded.userId, token: refreshToken },
    });

    if (!storedToken || new Date() > storedToken.expiresAt) {
      throw new Error("Invalid or expired refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(decoded.userId, decoded.email);

    await prisma.refreshToken.deleteMany({
      where: { userId: decoded.userId },
    });

    await storeRefreshToken(decoded.userId, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};


//-------
// export const loginUser = async (email : string, password : string) => {

//   const user = await prisma.user.findFirst({
//     where: {
//       email,
//       isDeleted: false,
//     }
//   })

//   if(!user) {
//     throw new Error("User does not exist");
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if(!isPasswordValid) {
//     throw new Error("Incorrrect Password");
//   }

//   const token= jwt.sign({ userId : user.id, email : user.email}, JWT_SECRET, {expiresIn: "1d"});

 


//   return {token, user: { id : user.id, name: user.name, email: user.email,}};
// }


export const createUser = async (name : string, email : string, password : string) => {
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password : hashedPassword,
        },
        select : {
          id : true,
         name : true,
         email : true,
        }
      })

      return user;
}


export const updateUser = async (id : number, name: string, email: string, password: string, isDeleted?: boolean) => {
    // console.log(id,name, email);
    const hashedPassword = await bcrypt.hash(password,10);
  return await prisma.user.update({
    where : {id},
    data : {
         name,
         email,
         password : hashedPassword, 
         isDeleted
        },
        select : {
          id : true,
         name : true,
         email : true,
        }
  });
};
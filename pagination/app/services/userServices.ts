import prisma from "../repository/userRepository";


export const createUser = async (stockSymbol : string, firstName : string, lastName : string, email : string, gender : string, language : string) => {
    const user = await prisma.user.create({
        data: {
            stockSymbol, 
            firstName, 
            lastName, 
            email, 
            gender,
            language
        },
        
      })

      return user;
}

interface title {
    stockSymbol : string,
    firstName : string,
    lastName : string,
    email : string,
    gender : string,
    language : string
}

export const getUsers = async (skip : number = 0 , title : string, sortIn: string = "asc", take : number = 10,) => {




    const results = await prisma.user.findMany({
        skip,
        take,
        orderBy: {
            [title]  : sortIn,
          },
      })

      return results
    // return await prisma.user.findMany();
  }
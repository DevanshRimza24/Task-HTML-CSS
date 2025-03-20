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

export const getUsers = async (skip : number = 0 , pageSize : number , title : string, sortIn: string = "asc", input ?: string) => {


   
    const count = await prisma.user.count({
        where: {
          firstName : {
            contains : input,
            mode : "insensitive"
          }
          
        },
      })

    let take  = pageSize


    if(count < take) {
      take= count
    }
    
    const results = await prisma.user.findMany({
        skip,
        take,
        where: {
            firstName: {
              contains: input,
              mode : "insensitive"
            },
          },
        orderBy: {
            [title]  : sortIn,
          },
      })
 
      return {results, count}
    // return await prisma.user.findMany();
  }
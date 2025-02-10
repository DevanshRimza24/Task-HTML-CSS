import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import router from "./app/routes/userRoute"; 

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});




// const user = {name : "Devansh", age : 19};

// console.log("Devansh");

// console.log(user.name);

// function addTwo(num : number) {
//     return num+10;
// }

// addTwo(5);

// function getUpperCase(val : string){
//     return val.toUpperCase();
// }

// getUpperCase("Inner");

// function signUpUser(name : string, email : string, isPaid : boolean = false){}

// signUpUser("Aman","aman@gmail.com");

// export {}
import express, {Application} from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
const cors = require("cors");
// import cors from "cors";
import { errorHandler } from "./app/controller/errorController";
import { noRouteFound } from "./app/helper/noRouteFound";
import userRoutes from "./app/routes/userRoutes"
// const app : Application = express();
const app = express();


// app.use(cors({
//     origin:'http://localhost:5173', 
//     credentials:true,           
//     // optionSuccessStatus:200
// }));

app.use(bodyParser.json());

app.use("/api",userRoutes);

// app.use("/api",userRoutes);


app.use(noRouteFound);

app.use(errorHandler);

const prisma = new PrismaClient;

const port = 3001;

prisma.$connect().then(() => {
    console.log("Database Connection Established");
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}).catch((err)=>{
        console.log("Database cannot be connected");
})
import express, {Application} from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./app/routes/userRoutes";
import { userAuth } from "./app/middleware/auth";
import bodyParser from "body-parser";
import userAuthRouter from "./app/routes/userAuth";
const app : Application = express();


app.use(bodyParser.json());
app.use("/api",userAuthRouter);

app.use("/api",userRoutes);

const prisma = new PrismaClient;

const port = process.env.PORT || 8000;

prisma.$connect().then(() => {
    console.log("Database Connection Established");
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}).catch((err)=>{
        console.log("Database cannot be connected");
})
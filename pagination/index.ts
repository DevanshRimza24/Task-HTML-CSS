import express, { Application } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import router from "./app/routes/userRoutes";
import { noRouteFound } from "./app/helper/noRouteFound";
import { errorHandler } from "./app/controller/errorController";

const app = express()

app.use(bodyParser.json())
app.use('/api', router)

app.use(noRouteFound)

app.use(errorHandler)

const prisma = new PrismaClient()


const port = process.env.PORT || 8000

prisma.$connect().then(() => {
    console.log("Database Connection Established");
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}).catch(()=>{
        console.log("Database cannot be connected");
})


// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });



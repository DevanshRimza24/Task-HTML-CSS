import express, { Application, NextFunction } from "express";
import userRoutes from "./app/routes/userRoutes";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import CustomError from "./app/errorHandler/customError";
import { errorHandler } from "./app/controller/errorController";
import { noRouteFound } from "./app/helper/noRouteFound";

const app = express();


app.use(bodyParser.json());

app.use("/api",userRoutes);


app.use(noRouteFound);

app.use(errorHandler);


const port = 8000;

app.listen(port,() => {
    console.log(`Server is listening at http://localhost:${port}`);
})

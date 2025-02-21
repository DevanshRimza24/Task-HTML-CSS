import express, { Application, NextFunction } from "express";
import userRoutes from "./app/routes/userRoutes";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import CustomError from "./app/errorHandler/customError";
import { errorHandler } from "./app/controller/errorController";

const app = express();


app.use(bodyParser.json());
app.use("/api",userRoutes);


app.use((req : Request, res : Response, next : NextFunction ) => {
 const err = new CustomError(`Cant find ${req.originalUrl} on server`, 404);
 next(err);
});

app.use(errorHandler);


const port = 8000;

app.listen(port,() => {
    console.log(`Server is listening at http://localhost:${port}`);
})

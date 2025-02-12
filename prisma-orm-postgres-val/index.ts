import express, { Application } from "express";
import userRoutes from "./app/routes/userRoutes";
import bodyParser from "body-parser";


const app : Application = express();

app.use(bodyParser.json());

// app.use("/api",userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

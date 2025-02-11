import express, {Application} from "express";
// import dotenv from "dotenv";
import userRoutes from "./app/routes/userRoutes"; 
import bodyParser from "body-parser";


// dotenv.config();
const port = process.env.PORT || 8000;

const app : Application = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);


// app.get("/api", (req, res) => {
//     res.send("Working");
// })

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
}); 
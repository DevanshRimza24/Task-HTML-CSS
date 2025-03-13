import { Router } from "express"
import { createUser } from "../controller/userController";
import { verifyToken, isAdmin } from "../middleware/authMiddleware";

const router : Router = Router();

router.post("/create-user", verifyToken, isAdmin, createUser)


export default router;
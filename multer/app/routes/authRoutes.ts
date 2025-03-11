import { NextFunction, Request, Router } from "express"
import { login, signUp } from "../controller/authController";





const router: Router = Router();


router.post('/signup', signUp);

router.post("/login", login);



export default router;
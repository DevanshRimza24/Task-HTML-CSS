import { Router } from "express"
import { signUpUserProfile } from "../controller/userController";

const router : Router = Router();

router.post("/signup-user-profile", signUpUserProfile);





export default router;
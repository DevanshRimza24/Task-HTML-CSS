import { Router } from "express"
import { createUser } from "../controller/userController";
// import { signUpUserProfile, updateUserProfile, getAllUsers } from "../controller/userController";
// import { validateUser, validateUserId, validateUpdateUser } from "../middleware/validators";
const router : Router = Router();

router.post("/create-user", createUser);


export default router;
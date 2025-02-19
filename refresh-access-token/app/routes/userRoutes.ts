import { Router } from "express"
import { signUpUserProfile, updateUserProfile } from "../controller/userController";
import { validateUser, validateUserId, validateUpdateUser } from "../middleware/validators";
import { userAuth } from "../middleware/auth";
const router : Router = Router();

router.post("/signup-user-profile",userAuth, validateUser, signUpUserProfile);
// router.post("/add-user-profile", userAuth, validateUser,addUserProfile);

router.patch('/update-user-profile/:id', validateUserId, validateUpdateUser, updateUserProfile);




export default router;
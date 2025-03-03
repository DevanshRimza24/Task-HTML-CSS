import { Router } from "express"
import { signUpUserProfile, updateUserProfile, getAllUsers } from "../controller/userController";
import { validateUser, validateUserId, validateUpdateUser } from "../middleware/validators";
import { userAuth } from "../middleware/auth";
const router : Router = Router();

router.post("/signup-user-profile", validateUser, signUpUserProfile);
// router.post("/add-user-profile", userAuth, validateUser,addUserProfile);

router.patch('/update-user-profile/:id', validateUserId, validateUpdateUser, updateUserProfile);
router.get('/get-users-profile', validateUser, getAllUsers);



export default router;
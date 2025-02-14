import { Router } from "express";
import { addUserProfile, getAllUsers, updateUserProfile, deleteUserProfile } from "../controller/userController";
import {validateUser, validateUserId, validateUpdateUser} from "../middleware/validators"
import { userAuth } from "../middleware/auth";
const router : Router = Router();

router.post("/add-user-profile", userAuth, validateUser,addUserProfile);
router.get('/get-users-profile',getAllUsers);
router.patch('/update-user-profile/:id', userAuth, validateUserId, validateUpdateUser, updateUserProfile);
router.delete('/delete-user-profile/:id', userAuth, validateUserId, deleteUserProfile);
export default router;
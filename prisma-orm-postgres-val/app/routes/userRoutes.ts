import { Router } from "express";
import { addUserProfile, getAllUsers, updateUserProfile, deleteUserProfile } from "../controller/userController";
import {validateUser, validateUserId, validateUpdateUser} from "../middleware/validators"
const router : Router = Router();

router.post("/add-user-profile", validateUser,addUserProfile);
router.get('/get-users-profile',getAllUsers);
router.patch('/update-user-profile/:id', validateUserId, validateUpdateUser, updateUserProfile);
router.delete('/delete-user-profile/:id', validateUserId, deleteUserProfile);
export default router;
import { Router } from "express";
import { addUserProfile, getAllUsers } from "../controller/userController";

const router : Router = Router();

// router.post("/add-user-profile", addUserProfile);
router.get('/get-users-profile',getAllUsers);



export default router;
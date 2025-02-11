import { Router } from 'express';
// import express from "express";

import {addUser, getAllUsers, updatedUser, deletedUser} from '../controller/userController';

const router: Router = Router();
// const router = express.Router();
// router.get('/get-user', getAllUsers); 
router.post('/add-user', addUser);   
router.get('/get-users',getAllUsers);
router.patch('/update-user/:id',updatedUser);
router.delete('/delete-user/:id',deletedUser);

export default router;
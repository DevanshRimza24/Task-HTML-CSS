import { Router } from 'express';
import { getAllUsers, addUser } from '../controller/userController';

const router: Router = Router();

router.get('/get-user', getAllUsers); 
router.post('/', addUser);    

export default router;

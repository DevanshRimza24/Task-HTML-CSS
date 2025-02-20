import { Router } from "express";
import {createEmployeeProfile, createDepartmentTable} from "../controller/userController";

const router = Router();

router.post("/create-employee-profile", createEmployeeProfile);
router.post("/create-department-table", createDepartmentTable);


export default router;
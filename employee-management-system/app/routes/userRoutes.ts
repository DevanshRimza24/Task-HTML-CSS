import { Router } from "express";
import {createEmployeeProfile, createDepartmentTable} from "../controller/userController";
import { validateDepartment } from "../middleware/validators";

const router = Router();

router.post("/create-employee-profile", createEmployeeProfile);
router.post("/create-department-table", validateDepartment, createDepartmentTable);





export default router;
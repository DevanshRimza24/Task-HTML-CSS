import { Router } from "express";
import { createDepartmentTable, getDepartmentDetails} from "../controller/departmentController";
import { validateDepartment, validateEmployee } from "../middleware/validators";
import { createEmployeeProfile } from "../controller/employeeController";

const router = Router();

router.post("/create-employee-profile", validateEmployee, createEmployeeProfile);
router.post("/create-department-table", validateDepartment, createDepartmentTable);
router.get("/get-departments-detail", getDepartmentDetails);




export default router;

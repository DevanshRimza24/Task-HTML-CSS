import { Router } from "express";
import { createDepartmentTable, getDepartmentDetails} from "../controller/departmentController";
import { validateDepartment, validateEmployee, validateUpdateEmployee } from "../middleware/validators";
import { createEmployeeProfile, getEmployeesProfiles, updateEmployeeProfile } from "../controller/employeeController";

const router = Router();

router.post("/create-employee-profile", validateEmployee, createEmployeeProfile);
router.patch("/update-employee-profile", validateUpdateEmployee, updateEmployeeProfile);

router.get("/get-employees-profiles", getEmployeesProfiles);


router.post("/create-department-table", validateDepartment, createDepartmentTable);
router.get("/get-departments-detail", getDepartmentDetails);





export default router;

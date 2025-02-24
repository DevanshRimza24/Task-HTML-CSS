import { body } from "express-validator";



export const validateEmployeeAttendance = [
    body("employeeId").trim().notEmpty().withMessage("EmployeeId is required"),
    body("date").isDate().withMessage("Date is required"),
    body("checkInTime").isISO8601().withMessage("Check In Time is required"),
    body("checkOutTime").isISO8601().withMessage("Check Out Time is required"),
]
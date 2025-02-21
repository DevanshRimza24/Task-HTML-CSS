import { body } from "express-validator";



export const validateDepartment = [
    body("departmentName").trim().notEmpty().withMessage("Department name is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),

]


// {
//     "status": 200,
//     "message": "Department Created Successfully",
//     "data": {
//         "id": "5a610a39-9819-4daf-955b-6221e739b173",
//         "departmentName": "SALES",
//         "location": "sector A"
//     },
//     "err": null
// }

// {
//     "status": 400,
//     "message": "Department name is required"
// }
import { body } from "express-validator";

const genders = [
    "Male",
    "Female"
  ]

export const validateDepartment = [
    body("departmentName").trim().notEmpty().withMessage("Department name is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),

]

export const validateEmployee = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("dateOfBirth").isDate().withMessage("Date of Birth is required"),
    body("gender").isIn(genders).withMessage("Correct Gender is required"),
    body("contactNumber").isNumeric().withMessage("Contact Number is required"),

    body("email").isEmail().withMessage("Invalid Email Id"),
    body("departmentId").trim().notEmpty().withMessage("Department Id is required"),
]


export const validateUpdateEmployee = [
    body("name").optional().trim().notEmpty().withMessage("Name is required"),
    body("dateOfBirth").optional().isDate().withMessage("Date of Birth is required"),
    body("gender").optional().isIn(genders).withMessage("Correct Gender is required"),
    body("contactNumber").optional().isNumeric().withMessage("Contact Number is required"),
    body("email").optional().isEmail().withMessage("Invalid Email Id"),

    // body("password").optional().isLength({ min: 5 }).withMessage("Password must be atleast 5 character"),
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
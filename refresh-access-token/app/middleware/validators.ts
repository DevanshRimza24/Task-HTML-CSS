import { body, param} from "express-validator";

export const validateUser = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid Email Id"),
    body("password").isLength({ min: 5 }).withMessage("Password must be atleast 5 character"),
]

export const validateUserId = [
    param("id").isInt({ min: 1 }).withMessage("Invalid User Id").toInt(),
]

export const validateUpdateUser = [
    body("name").optional().trim().notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().withMessage("Invalid Email Id"),
    body("password").optional().isLength({ min: 5 }).withMessage("Password must be atleast 5 character"),
]
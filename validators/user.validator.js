import { body } from "express-validator";

export const registerValidation = [
    body("fullName")
        .notEmpty()
        .withMessage("Full name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("acceptedTerms")
        .equals("true")
        .withMessage("You must accept Terms & Conditions"),
];
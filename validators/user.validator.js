import { body } from "express-validator";

export const registerValidation = [
    body("fullName")
        .notEmpty()
        .withMessage("Full name is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("acceptedTerms")
        .notEmpty()
        .withMessage("You must accept Terms & Conditions")
        .bail()
        .equals("true")
        .withMessage("You must accept Terms & Conditions"),
];
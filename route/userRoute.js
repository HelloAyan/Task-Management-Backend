import express from "express";
import { registerValidation } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUser } from "../controller/registrationController.js";
import { LoginUser } from "../controller/loginController.js";
import { forgetPassword } from "../controller/forgetPassword.js";
import { resetPassword } from "../controller/resetPassword.js";


const route = express.Router();

route.post("/register", registerValidation, validate, registerUser)
route.post("/login", LoginUser)
route.post("/forget-password", forgetPassword)
route.post("/reset-password/:token", resetPassword)

export default route;
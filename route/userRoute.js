import express from "express";
import { registerValidation } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUser } from "../controller/registrationController.js";
import { LoginUser } from "../controller/loginController.js";


const route = express.Router();

route.post("/register", registerValidation, validate, registerUser)
route.post("/login", LoginUser)

export default route;
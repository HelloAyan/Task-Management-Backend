import express from "express";
import { registerValidation } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUser } from "../controller/userController.js";


const route = express.Router();

route.post("/register", registerValidation, validate, registerUser)

export default route;
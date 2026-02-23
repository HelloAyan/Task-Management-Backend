import userModel from "../model/registrationModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, acceptedTerms } = req.body;

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword,
            acceptedTerms
        })
        const saveUser = await newUser.save();

        // Send Success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            saveUser,
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}
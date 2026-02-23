import bcrypt from "bcryptjs";
import userModel from "../model/registrationModel.js";
import generateToken from "../utils/generateToken.js";


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await userModel.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            })
        };

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        };

        // Generate token 
        const token = generateToken(user._id)

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error", error
        })
    }
}
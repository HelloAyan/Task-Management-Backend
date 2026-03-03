import User from "../model/registrationModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate random token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash token before save
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // save hashed token + expire
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // create reset url
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // send email
        await sendEmail({
            to: user.email,
            subject: "Password Reset",
            html: `
        <h2>Password Reset</h2>
        <p>Click the link below:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 10 minutes.</p>
      `
        });

        res.status(200).json({
            message: "Reset link sent to email"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
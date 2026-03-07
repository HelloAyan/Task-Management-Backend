import User from "../model/registrationModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        //Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
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
            <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:40px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                
                <h2 style="color:#333333; text-align:center;">Password Reset Request</h2>

                <p style="color:#555; font-size:15px;">
                We received a request to reset your password for your account.
                If you made this request, please click the button below to set a new password.
                </p>

                <div style="text-align:center; margin:30px 0;">
                <a href="${resetUrl}" 
                    style="background-color:#2563eb; color:#ffffff; padding:12px 25px; 
                    text-decoration:none; border-radius:5px; font-size:15px; display:inline-block;">
                    Reset Password
                </a>
                </div>

                <p style="color:#555; font-size:14px;">
                This password reset link will expire in <strong>10 minutes</strong> for security reasons.
                </p>

                <p style="color:#777; font-size:13px;">
                If you did not request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
                </p>

                <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

                <p style="font-size:12px; color:#999; text-align:center;">
                Task Manager Application<br/>
                This is an automated message, please do not reply to this email.
                </p>

            </div>
            </div>
            `
        });

        res.status(200).json({
            success: true,
            message: "Reset link has been sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.verify();
        console.log("SMTP connected");
    } catch (error) {
        console.log("SMTP error:", error);
    }

    await transporter.verify();

    const mailOptions = {
        from: `"Task Manager" <nirabiubat@gmail.com>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
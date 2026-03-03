// utils/sendEmail.js

import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    // create SMTP transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    // mail options
    const mailOptions = {
        from: `"Task Manager" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    // send email
    await transporter.sendMail(mailOptions);

};

export default sendEmail;
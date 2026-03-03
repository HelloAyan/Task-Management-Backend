import nodemailer from 'nodemailer';

const sendEmail = async (onabort) => {

    // Create transporter using gmail
    const transporter = nodemailer.createTestAccount({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //Main options for sending email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: option.to,
        subject: option.subject,
        html: option.html
    }

    // Send email
    await transporter.sendEmail(mailOptions);
}

export default sendEmail;
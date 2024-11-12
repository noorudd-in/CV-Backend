const transporter = require("../config/mailer");
const { verifyEmailBody, forgotUsernameEmailBody, forgotPasswordEmailBody } = require('../utils/htmlResponse')

const fromEmail = 'Noorudd.in <verify@noorudd.in>'
const brand = 'View My CV';

const sendVerificationEmail = (to, fullName, verificationUrl) => {
    const emailBody = verifyEmailBody
        .replaceAll("{{verificationUrl}}", verificationUrl)
        .replace("{{userFullName}}", fullName);

    const mailOptions = {
        from: fromEmail,
        to,
        subject: `Welcome to ${brand} 🎉 – Let's Get Your Portfolio Ready!`,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

const sendForgotUsernameEmail = (to, fullName, username) => {
    const emailBody = forgotUsernameEmailBody
        .replace("{{requestedUsername}}", username)
        .replace("{{userFullName}}", fullName)
        .replaceAll("{{brandName}}", brand)

    const mailOptions = {
        from: fromEmail,
        to,
        subject: `Here’s Your Username for ${brand}`,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

const sendForgotPasswordEmail = (to, fullName, verificationUrl) => {
    const emailBody = forgotPasswordEmailBody
        .replaceAll("{{verificationUrl}}", verificationUrl)
        .replace("{{userFullName}}", fullName)
        .replaceAll("{{brandName}}", brand)

    const mailOptions = {
        from: fromEmail,
        to,
        subject: `Reset Your Password`,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

module.exports = { sendVerificationEmail, sendForgotUsernameEmail, sendForgotPasswordEmail }
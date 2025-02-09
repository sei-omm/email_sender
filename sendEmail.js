require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: `"GitHub Actions" <${process.env.SMTP_USER}>`,
  to: "locbilla@gmail.com",
  subject: "GitHub Actions Email Test",
  text: "Hello! This email was sent from a GitHub Actions workflow.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
    process.exit(1); // Fail the workflow if email fails
  } else {
    console.log("Email sent:", info.response);
  }
});

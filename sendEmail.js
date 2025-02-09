const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

// Load environment variables
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const toEmail = process.env.TO_EMAIL;  // ✅ Get from API
const username = process.env.USERNAME || "Guest";  // ✅ Get from API

// Read and compile EJS template
const emailTemplate = fs.readFileSync("emailTemplate.ejs", "utf-8");
const htmlContent = ejs.render(emailTemplate, { username });

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort == 465, // Use TLS if port 465
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const mailOptions = {
  from: `"Your Company" <${smtpUser}>`,
  to: toEmail,
  subject: "Personalized Email for " + username,
  html: htmlContent,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email failed:", error);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});

// // Import the Express.js library
// const express = require('express');

// // Create an Express application
// const app = express();

// // Define the port the server will listen on
// const port = process.env.PORT || 3000;

// // Define a route for the root path ("/")
// app.get('/', (req, res) => {
//   res.send('Hello World! This is the root route.');
// });

// // Define another route for "/about"
// app.get('/about', (req, res) => {
//   res.send('This is the about page.');
// });

// // Start the server and listen for incoming requests
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

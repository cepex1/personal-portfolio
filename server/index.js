const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const { EMAIL_ADDRESS, EMAIL_PASS } = process.env;

/**
 * Azure Function to handle POST /api/contact
 */
module.exports = async function (context, req) {
  // Solo aceptar POST
  if (req.method !== "POST") {
    context.res = {
      status: 405,
      body: "Method Not Allowed",
    };
    return;
  }

  const { firstName, lastName, email, message } = req.body;

  // Validaciones manuales (no puedes usar express-validator directamente)
  const errors = [];

  if (!firstName) errors.push({ msg: "First name is required", param: "firstName" });
  if (!lastName) errors.push({ msg: "Last name is required", param: "lastName" });
  if (!email || !email.match(/^[^@]+@[^@]+\.[^@]+$/)) errors.push({ msg: "Valid email is required", param: "email" });
  if (!message) errors.push({ msg: "Message cannot be empty", param: "message" });

  if (errors.length > 0) {
    context.res = {
      status: 400,
      body: { errors },
    };
    return;
  }

  // Enviar el correo
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${firstName} ${lastName} <${email}>`,
    to: EMAIL_ADDRESS,
    subject: "Contact Form Submission - Portfolio",
    html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);

    context.res = {
      status: 200,
      body: { status: "Message Sent" },
    };
  } catch (error) {
    console.error("Email error:", error);
    context.res = {
      status: 500,
      body: { message: "Error sending email." },
    };
  }
};

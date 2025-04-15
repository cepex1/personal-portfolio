const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator"); // Importar express-validator
require("dotenv").config(); // Cargar variables de entorno

const PORT = process.env.PORT || 5000; // Puerto por defecto para el servidor
const app = express(); // Crear una instancia de Express
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json()); // Analizar cuerpos JSON

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send emails!");
  }
});

app.post(
  "/api/contact",
  // Validaciones de los campos
  body("firstName").notEmpty().withMessage("First name is required").escape(),
  body("lastName").notEmpty().withMessage("Last name is required").escape(),
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail(),
  body("message").notEmpty().withMessage("Message cannot be empty").escape(),
  (req, res) => {
    // Verificar los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Si no hay errores, continuar con el envío del correo
    const name = req.body.firstName + " " + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;

    const mail = {
      from: name,
      to: process.env.EMAIL_ADDRESS,
      subject: "Contact Form Submission - Portfolio",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while sending the email." });
      } else {
        res.status(200).json({ status: "Message Sent" });
      }
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");
require('dotenv').config();

if (process.env.IS_PROD == "true") {
  let mailer = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  module.exports = mailer;
} else {
  let mailer = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  module.exports = mailer;
}

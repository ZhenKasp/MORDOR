require('dotenv').config();
const nodemailer = require("nodemailer");

const createMail = (mailer, email, token) => {
  const data = {
    from: '"MORDOR 👻" <foo@example.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<a href='${process.env.DOMAIN}/api/v1/users/verification?token=${token}'>To verificate you account go to this link</a>`,
  };
  (async() => {
    if (process.env.IS_PROD == "true") {
      mailer.messages().send(data, function (error, body) {
        console.log(body);
      });
    } else {
      const info = await mailer.sendMail(data);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  })();
}

module.exports = createMail;

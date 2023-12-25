const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

exports.mailSender = async ({ name, email, phone, subject, message }) => {
  const configs = {
    host: "mail.emanagerit.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(configs);
  const Mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "eManager",
      link: "https://emanagerit.com",
    },
  });

  const emailBody = {
    body: {
      name: "eManager Admin",
      intro: "You have a new message from a client",
      table: {
        data: [
          {
            item: "Name",
            description: name,
          },
          {
            item: "Phone",
            description: phone,
          },
          {
            item: "Email",
            description: email,
          },
          {
            item: "Subject",
            description: subject,
          },
          {
            item: "Message",
            description: message,
          },
        ],
      },
    },
  };
  const mail = Mailgenerator.generate(emailBody);

  const message = {
    to: process.env.EMAIL,
    subject: subject,
    html: mail,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

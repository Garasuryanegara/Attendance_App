const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  auth: {
    user: process.env.nodemailer_email,
    pass: process.env.nodemailer_pass,
  },
  host: "smtp.gmail.com",
});

const mailer = async ({ subject, html, to, text }) => {
  console.log(process.env.nodemailer_email);
  console.log(process.env.nodemailer_pass);

  await transport.sendMail({
    subject: subject || "testing kirim email nodemailer",
    html: html || "",
    to: to || "suryanegarsinatriyya@gmail.com",
    text: text || "halo halo masuk ga nih emailnya",
  });
};

module.exports = mailer;

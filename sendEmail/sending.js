const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 587,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.OAUTH_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

async function send(receiverEmail, title, htmls) {
  const message = {
    from: process.env.OAUTH_USER,
    to: receiverEmail,
    subject: title,
    html: htmls,
  };

  try {
    await transporter.sendMail(message);
    console.log("메일을 성공적으로 발송했습니다.");
  } catch (e) {
    console.log(e);
  }
}

module.exports = send;

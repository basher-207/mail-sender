require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD
  }
},{
  from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_ADDRESS}>`
});

const sendMail = async (mailBody) => {
  const mailOptions = {
    to: process.env.MAIL_RECEIVER, 
    subject: mailBody.subject,
    text: mailBody.text,
    attachments: [{
      path: __dirname + '/../../userAttachments/filename',
    }]
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
const nodemailer = require('nodemailer');
const { SMTP_PASSWORD, EMAIL } = process.env;

const sendEmail = (userEmail, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: EMAIL,
      to: userEmail,
      subject,
      html,
      disableUrlAccess: false,
      attachments: [
        {
          filename: 'Header_Mail2_swefln.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1678234707/Header_Mail2_swefln.png',
          cid: 'vdv@Logo',
        },
        {
          filename: 'Fondo2_zstsxi.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677345555/Fondo2_zstsxi.png',
          cid: 'vdv@Fondo',
        },
      ],
    },
    (error, info) => {
      if (error) {
        console.log('erroir::', error);
        throw Error('An error has ocurred', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    }
  );
};

module.exports = {
  sendEmail,
};

// services/authService.js
const nodemailer = require('nodemailer');

const generateResetToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const validateResetToken = (savedToken, inputToken) => {
  return savedToken === inputToken;
};

const sendResetTokenByEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Use the following link to reset your password: http://your-app/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  generateResetToken,
  validateResetToken,
  sendResetTokenByEmail,
};

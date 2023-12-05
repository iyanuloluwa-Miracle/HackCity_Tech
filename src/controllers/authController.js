require("../models/database");
const { User } = require('../models/User');
const argon2 = require('argon2');
const { generateAccessToken } = require('../utils/authUtils');

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await argon2.hash(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ success: true, data: { email: user.email }, message: 'User registration successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message, message: 'User registration failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({ success: true, data: { email: user.email, accessToken }, message: "Login Successful" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const logoutUser = (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully! Thank You for using our Application' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Implement logic to send a password reset email with a unique token
    // You may use a library like nodemailer to send emails with a reset link

    res.status(200).json({ success: true, data: { email: user.email }, message: 'Password reset email sent' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Implement logic to verify the resetToken and update the user's password
    // You may use a library to validate the resetToken and update the password

    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, data: { email: user.email }, message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};

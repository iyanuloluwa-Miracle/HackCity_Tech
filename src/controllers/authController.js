require("../models/database");
const User = require("../models/User");
const argon2 = require("argon2");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authUtils");

// Controller for user sign-up
const signupUser = async (req, res) => {
  try {
    const { email, password, confirmedPassword } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "User already exists",
          normalMessage: "User registration failed",
        });
    }

    // Validate the confirmed password field
    if (password !== confirmedPassword) {
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: "Passwords do not match",
          normalMessage: "User registration failed",
        });
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res
      .status(201)
      .json({
        success: true,
        data: user,
        message: "User registration successful",
        normalMessage: null,
      });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: "User registration failed",
        normalMessage: null,
      });
  }
};

// Controller for user sign-in
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          data: null,
          error: "Invalid email or password",
          message: null,
          normalMessage: null,
        });
    }

    // Compare the password using Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({
          success: false,
          data: null,
          error: "Invalid email or password",
          message: null,
          normalMessage: null,
        });
    }

    // Generate the access token and refresh token
    const accessToken = generateAccessToken(user);

    // Send both tokens in the response
    res
      .status(200)
      .json({
        success: true,
        data: { user, accessToken, refreshToken },
        error: null,
        message: "Login Successful",
        normalMessage: null,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: null,
        normalMessage: null,
      });
  }
};

// Controller for user logout
const logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    res
      .status(200)
      .json({
        success: true,
        data: null,
        message: "Logged out successfully!",
        normalMessage: null,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: null,
        normalMessage: null,
      });
  }
};

module.exports = {
  signupUser,
  signInUser,
  logoutUser,
};

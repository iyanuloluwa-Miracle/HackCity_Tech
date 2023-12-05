const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: '20m',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = { generateAccessToken };
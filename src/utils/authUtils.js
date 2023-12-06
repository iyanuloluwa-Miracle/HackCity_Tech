// authUtils.js

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name,
  };

  const options = {
    expiresIn: '50m',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  console.log('Generated Token:', token);

  return token;
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader); // Add this line

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Invalid token: Token not found'); // Add this line
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decodedToken); // Add this line
    req.user = decodedToken; // Attach the decoded user to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.log('Invalid token: Verification failed'); // Add this line
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { verifyToken, generateAccessToken };

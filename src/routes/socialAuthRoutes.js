const express = require('express');
const router = express.Router();
const { googleAuth, googleAuthCallback } = require('../controllers/SocialAuthController');

// Route for Google authentication
router.get('/auth/google', googleAuth);

// Route for Google authentication callback
router.get('/auth/google/callback', googleAuthCallback, (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

module.exports = router;

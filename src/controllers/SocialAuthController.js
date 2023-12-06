require("../models/database");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OAuthUser = require('../models/OAuthUser');
require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  // Find the user in the database or create a new user
  let user = await OAuthUser.findOne({ googleId: profile.id });
  if (!user) {
    user = new OAuthUser({ googleId: profile.id, name: profile.displayName });
    await user.save();
  }

  return cb(null, user);
}
));

const googleAuth = passport.authenticate('google', { scope: ['profile'] });

const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/login' });

module.exports = {
  googleAuth,
  googleAuthCallback
};
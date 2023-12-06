const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OAuthUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    default: uuidv4
  }
});

module.exports = mongoose.model('OAuthUser', OAuthUserSchema);
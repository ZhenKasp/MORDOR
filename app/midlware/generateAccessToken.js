const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateAccessToken = (email, username, id) => {
  return jwt.sign({ email: email, username: username, id: id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

module.exports = generateAccessToken;
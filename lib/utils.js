const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1D" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };

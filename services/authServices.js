const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/utils");
const { findUserByEmail, createUser } = require("../models/userModel");
const { ERROR } = require("../constants");

const signUp = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error(ERROR.USER_ALREADY_EXIST);
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password.toString(), salt);

  const result = await createUser({ name, email, password: hashedPassword });
  const token = generateToken({ userId: result.insertedId });

  return {
    message: ERROR.SIGNUP_SUCCESS,
    token,
    success: true,
  };
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error(ERROR.EMAIL_NOT_EXIST);
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password.toString(), user.password);
  if (!isMatch) {
    const error = new Error(ERROR.INVALID_CREDENTIALS);
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ userId: user._id });

  return {
    message: ERROR.LOGIN_SUCCESS,
    token,
    success: true,
  };
};

module.exports = {
  signUp,
  login,
};

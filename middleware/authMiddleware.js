const { ERROR } = require("../constants");
const { verifyToken } = require("../lib/utils");

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: ERROR.NO_TOKEN_PROVIDED, success: false });

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: ERROR.INVALID_TOKEN, success: false });
  }
};

module.exports = { verifyUser };

const { ERROR } = require("../constants");
const { signUp, login } = require("../services/authServices");

class AuthController {
  static async signup(req, res) {
    try {
      const result = await signUp(req.body);
      return res.status(201).json({ result });
    } catch (error) {
      return res.status(500).json({
        result: {
          message: error.message,
          success: false,
        },
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await login(email, password);
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({
        result: {
          message: error.message,
          success: false,
        },
      });
    }
  }

  static async profile(req, res) {
    try {
      return res.status(200).json({
        message: "Welcome to your profile",
        user: req.user,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: ERROR.INTERNAL_SERVER_ERROR,
        success: false,
      });
    }
  }
}

module.exports = AuthController;

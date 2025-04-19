const { ERROR } = require("../constants");
const { signUp, login } = require("../services/authServices");

class AuthController {
  static async signup(req, res) {
    try {
      const result = await signUp(req.body);
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({
        result: {
          message: ERROR.INTERNAL_SERVER_ERROR,
          success: false,
        },
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await login(email, password);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        result: {
          message: ERROR.INTERNAL_SERVER_ERROR,
          success: false,
        },
      });
    }
  }

  static async profile(req, res) {
    try {
      res.status(200).json({
        message: "Welcome to your profile",
        user: req.user,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: ERROR.INTERNAL_SERVER_ERROR,
        success: false,
      });
    }
  }
}

module.exports = AuthController;

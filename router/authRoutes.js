const AuthController = require("../controllers/authController");
const { verifyUser } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/profile", verifyUser, AuthController.profile);

module.exports = router;

const router = require("express").Router();
const {
  register,
  login,
  logout,
  updateuser,
} = require("../Controllers/authController");
const authenticate = require("../Middleware/Authenticate");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upadteUser").patch(authenticate, updateuser);
router.get("/logout", logout);
// router.route('/getCurrentUser').get()

module.exports = router;

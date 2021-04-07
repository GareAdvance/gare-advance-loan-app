const express = require("express");
const {
  createUser,
  signIn,
  forgotPassword,
  // reset,
  resetPassword,
  // googlelogin,
  // facebooklogin,
  creditLogin,
} = require("../controller/auth");
const { validateUser, validateLogin, validateResetPassword, validatePassword } = require("../validation/user_validator");

const router = express.Router();

router.post("/signup/:userType", validateUser, createUser);
router.post("/login/:userType", validateLogin, signIn);
// router.post("/googlelogin", googlelogin);
// router.post("/facebooklogin", facebooklogin);
router.post("/credit/login", creditLogin);
router.put("/forgot_password/:userType", forgotPassword);
// router.get("/forgot_password/:token/:userType", reset);
router.put("/reset_password/:userType", validateResetPassword, resetPassword);

module.exports = router;
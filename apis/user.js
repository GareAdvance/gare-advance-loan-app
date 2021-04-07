const express = require("express");
const { 
  createUser, 
  getUsers, 
  getUser,
  deleteUser,
  verifyEmail,
  otherPersonalDetails,
  changePassword,
  uploader
} = require("../controller/user");
const { emailVerificationValidator } = require("../validation/email_verification_validation");
const { otherDetailsValidator } = require("../validation/otherDetailValidation");
const { 
  validateUser,
  validatePasswordChange,
  profilePictureValidator,
} = require("../validation/user_validator");


const router = express.Router();

router.post("/signup", validateUser, createUser);
router.put("/user/verify_email", emailVerificationValidator, verifyEmail);
router.get("/users", getUsers);
router.put("/user/details", otherDetailsValidator, otherPersonalDetails)
router.put("/user", getUser);
router.put("/user/change_password", validatePasswordChange, changePassword);
router.put("/delete", deleteUser);
router.put("/user/uploader", profilePictureValidator, uploader);

module.exports = router;
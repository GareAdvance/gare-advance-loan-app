const {check, validationResult} = require('express-validator');


exports.validateUser = [
  check('firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  check("firstName").isAlpha().withMessage("Invalid name. First name must be alphabets"),
  check("firstName").exists().withMessage("First name is not provided"),
  check("firstName").isLength({ max: 20 }).withMessage("First name is too long. Use a maximum of 20 characters"),
  check('lastName').isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
  check("lastName").isAlpha().withMessage("Invalid name. Last name must be alphabets"),
  check("lastName").exists().withMessage("Last name is not provided"),
  check("lastName").isLength({ max: 20 }).withMessage("Last name is too long. Use a maximum of 20 characters"),
  check("phoneNumber").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    } else {
        next();
    }
  }
];

exports.validateLogin = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    } else {
        next();
    }
  }
]

exports.validateResetPassword = [
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  check("confirmPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    } else {
      next();
    }
  }
];

exports.validatePasswordChange = [
  // check("newPassword").isEmpty().withMessage("New password is required"),
  check("oldPassword").isLength({ min: 6, max: 20 }).withMessage("Old password too short."),
  check("newPassword").isLength({ min: 6, max: 20 }).withMessage("New password too short"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      next();
    }
  }
]

exports.profilePictureValidator = [
  check("photo").isURL().withMessage("Invalid profile picture link"),
  check("userId").isMongoId().withMessage("Invalid user ID"),
  (req, res, next) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    } else {
      next();
    }
  }
]


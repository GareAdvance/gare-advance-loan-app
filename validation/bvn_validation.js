const { check, validationResult } = require("express-validator");

exports.bvnValidator = [
  check("bvn").isNumeric().withMessage("BVN must be of number type"),
  check("bvn").isLength({ min: 11, max: 11 }).withMessage("BVN must be at least 11 characters"),
  check("dateOfBirth").isDate().withMessage("Invalid date of birth."),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("userId").isMongoId().withMessage("Invalid user ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      next();
    }
  }
]
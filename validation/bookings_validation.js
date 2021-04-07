const { check, validationResult } = require("express-validator");

exports.bookingsValidator = [
  check("amount").isInt().withMessage("Invalid amount. Please provide a valid loan amount"),
  check("tenure").isInt().withMessage("Loan tenure is required"),
  // check("businessAddress").isArray().withMessage("Business address is required"),
  // check("bookingStatus").isBoolean().withMessage("Booking status is required"),
  // check("workId").isURL().withMessage("Your means of identification is required"),
  // check("fullName").isLength({ min: 3}).withMessage("You full name is required"),
  // check("accountName").isString().withMessage("Account name is required"),
  // check("accountNumber").isNumeric().withMessage("Account number is required"),
  // check("bankName").isString().withMessage("Invalid bank name. Bank name must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    }
    next();
  }
];
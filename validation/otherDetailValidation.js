const { check, validationResult} = require("express-validator");
// ["international passport", "driver's license", "voter's card", "national identity", "others"]

exports.otherDetailsValidator = [
  check("userId").isMongoId().withMessage("Invalid user ID"),
  check("dateOfBirth").isISO8601().withMessage("Date of birth must be of date type"),
  check("address").exists().withMessage("Your permanent residential address is required"),
  check("meansOfIdentification").isURL().withMessage("Please upload your means of identification"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      next();
    }
  }
]
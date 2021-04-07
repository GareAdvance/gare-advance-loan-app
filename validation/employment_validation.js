const {check, validationResult} = require('express-validator');


exports.validateEmployment = [
  check("employmentType").isIn([ "full time", "part time", "contract", "outsourced", "self employed"]).withMessage("Please enter a valid employment type"),
  check("jobPosition").isString().withMessage("Invalid job position. Position must be a string"),
  check("jobPosition").isLength({ min: 2 }).withMessage("Job position must be at least 2 characters long"),
  check("company_address").isString().withMessage("Company address must be a string"),
  check("company_address").isLength({ min: 3 }).withMessage("Company address too short. Enter at least 10 characters"),
  check("company_name").isString().withMessage("Company name must be string"),
  check("company_name").isLength({ min: 5 }).withMessage("Company name too short. Enter at least 5 characters"),
  check("userId").isMongoId().withMessage("Invalid user ID"),
  
  function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    } else {
      next();
    }
  }
];
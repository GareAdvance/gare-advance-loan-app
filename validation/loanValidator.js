const { check, validationResult } = require("express-validator");

const nameEnum = [
  "Access Bank", "Citibank", 
  "Diamond Bank", 
  "Dynamic Standard Bank", 
  "Ecobank Nigeria", 
  "Fidelity Bank Nigeria",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank Plc",
  "Jaiz Bank",
  "Keystone Bank Limited",
  "Providus Bank Plc",
  "Polaris Bank",
  "Stanbic IBTC Bank Nigeria Limited",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Suntrust Bank Nigeria Limited",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank Plc",
  "Wema Bank",
  "Zenith Bank",
];

exports.loanValidator = [
  check("amount").isNumeric().withMessage("Amount is required"),
  check("tenure").isInt().withMessage("Loan tenure is required"),
  check("purpose").isString().withMessage("Tell us what you want the for"),
  check("relManager").isLength({ min: 5, max: 30 }).withMessage("Relationship manager name is too short"),
  check("relManager").isString().withMessage("Please choose a relationship manager"),
  check("category").isIn([ "personal", "business", "salary"]).withMessage("Invalid loan type"),
  check("companyName").isString().withMessage("Please provide your company name"),
  check("salary").isInt().withMessage("Invalid amount"),
  check("fullName").isString().withMessage("Invalid guarrantor name"),
  check("address").isString().withMessage("Invalid guarantor address"),
  check("relationship").isIn([ "wife", "father", "mother", "brother", "sister", "son", "dauther" ]).withMessage("Invalid guarrantor relationship"),
  check("email").isEmail().withMessage("Guarrantor email address is invalid"),
  check("phoneNumber").isMobilePhone("en-NG").withMessage("Guarrantor phone number is invalid"),
  check("accountNumber").isNumeric().withMessage("Invalid account number"),
  check("accountNumber").isLength({ min: 10, max: 10 }).withMessage("Incomplete account number"),
  check("accountType").isString().withMessage("Invalid account type"),
  check("bankName").isString().withMessage("Invalid bank name"),
  check("accountName").isString().withMessage("Invalid account name"),
  check("accountName").isLength({ min: 3, max: 30 }).withMessage("Account name is too short"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    } else {
      next();
    }
  }
]
    
exports.salaryLoanValidator = [
  check("amount").isNumeric().withMessage("Amount is required"),
  check("userId").isMongoId().withMessage("Invalid user ID"),
  check("tenure").isInt().withMessage("Loan tenure is required"),
  check("payday").isString().isLength({ min: 2, max: 2 }).withMessage("Your salary pay day is required"),
  check("purpose").isString().withMessage("Tell us what you want the for"),
  check("relManager").isLength({ min: 5, max: 30 }).withMessage("Relationship manager name is too short"),
  check("relManager").isString().withMessage("Please choose a relationship manager"),
  check("category").isIn([ "personal", "business", "salary"]).withMessage("Invalid loan type"),
  check("companyName").isString().isLength({ min: 3, max: 30 }).withMessage("Please provide your company name"),
  check("salary").isInt().withMessage("Invalid amount"),
  check("fullName").isString().withMessage("Invalid guarrantor name"),
  check("email").isEmail().withMessage("Guarrantor email address is invalid"),
  check("phone").isMobilePhone("en-NG").withMessage("Guarrantor phone number is invalid"),
  check("accountNumber").isLength({ min: 10, max: 10 }).withMessage("Incomplete account number"),
  check("accountType").isIn([ "savings", "current" ]).withMessage("Invalid account type"),
  check("bankName").isString().withMessage("Invalid bank name"),
  check("accountName").isString().withMessage("Invalid account name"),
  check("workId").isURL().withMessage("Invalid Work Identity Card"),
  check("accountName").isLength({ min: 3, max: 30 }).withMessage("Account name is too short"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    } else {
      next();
    }
  }
]
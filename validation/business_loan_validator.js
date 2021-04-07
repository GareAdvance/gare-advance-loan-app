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

exports.businessLoanValidator = [
  check("amount").isNumeric().withMessage("Amount is required"),
  check("tenure").isInt().withMessage("Loan tenure is required"),
  check("purpose").isString().withMessage("Tell us what you want the for"),
  check("relManager").isLength({ min: 5, max: 30 }).withMessage("Relationship manager name is too short"),
  check("relManager").isString().withMessage("Please choose a relationship manager"),
  check("category").isIn([ "personal", "business", "salary"]).withMessage("Invalid loan type"),
  check("businessName").isString().isLength({ min: 3, max: 30 }).withMessage("Please provide your business name"),
  check("businessAddress").isString().withMessage("Business address is required"),
  check("email").isEmail().withMessage("Invalid business email"),
  check("businessType").isLength({ min: 3, max: 30 }).withMessage("Business type is too short"),
  check("businessType").isString().withMessage("Business type is required"),
  check("registrationNumber").isString().withMessage("Your business registration number is required"),
  check("registrationNumber").isString({ min: 7, max: 20 }).withMessage("Invalid business registration number"),
  check("fullName").isString().withMessage("Invalid guarrantor name"),
  check("address").isString().withMessage("Invalid guarantor address"),
  check("relationship").isIn([ "wife", "father", "mother", "brother", "sister", "son", "dauther", "uncle", "aunty" ]).withMessage("Invalid guarrantor relationship"),
  check("gEmailAddress").isEmail().withMessage("Guarrantor email address is invalid"),
  check("phoneNumber").isMobilePhone("en-NG").withMessage("Guarrantor phone number is invalid"),
  check("accountNumber").isInt().withMessage("Invalid account number"),
  check("accountNumber").isLength({ min: 10, max: 10 }).withMessage("Incomplete account number"),
  check("accountType").isIn([ "savings", "current" ]).withMessage("Invalid account type"),
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
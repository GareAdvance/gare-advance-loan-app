const express = require("express");
const { 
  loanRequest, 
  getLoans,
  getLoan,
  approveLoan,
  businessLoan,
  fundAccount,
  salaryLoan,
  getLoansByCustomer,
} = require("../controller/loan");

const requireLogin = require("../config/auth");
const { loanValidator, salaryLoanValidator } = require("../validation/loanValidator");
const { businessLoanValidator } = require("../validation/business_loan_validator");

const router = express.Router();
// ,
router.post("/loan/personal", requireLogin, loanValidator, loanRequest);
router.post("/loan/salary", requireLogin, salaryLoanValidator, salaryLoan);
router.post("/loan/business", requireLogin, businessLoanValidator, businessLoan);
router.get("/loan/all", getLoans);
router.get("/loan/me", requireLogin, getLoansByCustomer);
router.get("/loan/fund_account", fundAccount);
router.put("/loan/single", getLoan);
router.put("/loan/approve", approveLoan);


module.exports = router;
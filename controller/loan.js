const fetch = require("node-fetch");
const { Loan } = require("../models/loan");
const { User } = require("../models/user");
const { Approval } = require("../models/approval");
const paginate = require("jw-paginate");
const { verifyCRBVN, checkScore } = require("../services/credit_scoring");
const { codeGenerator } = require("../services/code_generator");
const { loan_mailer } = require("../services/loan_mailer");

exports.loanRequest = async (req, res) => {
  try {
    let AccountOwnerRegistryIDs;

    let existingUser = await User.findById({ _id: req.body.userId }).populate("bvnId").populate("employmentId").populate("bank");
    if (!existingUser) return res.status(400).json({ error: "Unknown user access. Please log in properly to continue" });
    const isLoanTaken = existingUser.pendingLoan;
    if (isLoanTaken) return res.status(400).json({ error: "You currently have an outstanding loan to pay" });
    if (!existingUser.bank || !existingUser.bvnId || !existingUser.employmentId) return res.status(400).json({ error: "Please complete your profile and contr" });

    const bvn = existingUser.bvnId.bvn;
    const data = { BVN: bvn, sessionCode: req.body.sessionCode, }

    const isBVN = await verifyCRBVN(data);
  
    if (isBVN.Message.includes("not found")) {
      if (req.body.amount < 100000 || req.body.amount > 5000000) return res.status(400).json({ error: "You can only access between 100000 and 5000000 naira" });
      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        company: req.body.companyName,
        monthlySalary: req.body.salary,
        payDay: req.body.payday,
        workId: req.body.workID,
        uniqueID: codeGenerator("GA"),
        amountToPay: req.body.amountToPay,
        category: req.body.category,
        "guarrantor.fullname": req.body.fullName,
        "guarrantor.address": req.body.address,
        "guarrantor.relationship": req.body.relationship,
        "guarrantor.email": req.body.email,
        "guarrantor.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }

      return loan_mailer(data, res);

    } else {

      AccountOwnerRegistryIDs = isBVN.SearchResult[0].RegistryID;

      const creditData = { sessionCode: req.body.sessionCode, AccountOwnerRegistryIDs }
  
      const creditCheck = await checkScore(creditData);
  
      const creditScore = creditCheck.SMARTScoreResults[0].SMARTScores[0].Score;
  
      if (creditScore <= 590) return res.status(400).json({ error: "You are not eligible to take a loan at the moment." });
      if (req.body.amount < 100000 || req.body.amount > 5000000) return res.status(400).json({ error: "You can only access between 100000 and 5000000 naira" });
      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        company: req.body.companyName,
        monthlySalary: req.body.salary,
        payDay: req.body.payday,
        workId: req.body.workID,
        uniqueID: codeGenerator("GA"),
        amountToPay: req.body.amountToPay,
        category: req.body.category,
        "guarrantor.fullname": req.body.fullName,
        "guarrantor.address": req.body.address,
        "guarrantor.relationship": req.body.relationship,
        "guarrantor.email": req.body.email,
        "guarrantor.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }
      return loan_mailer(data, res);
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}


exports.businessLoan = async (req, res) => {

  try {
    let AccountOwnerRegistryIDs;

    let existingUser = await User.findById({ _id: req.body.userId }).populate("bvnId").populate("employmentId").populate("bank");

    if (!existingUser) return res.status(400).json({ error: "Unknown user access. Please login properly to continue" });

    const isLoanTaken = existingUser.pendingLoan;

    if (isLoanTaken) return res.status(400).json({ error: "You currently have an outstanding loan to pay" });

    if (!existingUser.bank || !existingUser.bvnId || !existingUser.employmentId) return res.status(400).json({ error: "Please complete your profile and contr" });

    const bvn = existingUser.bvnId.bvn;

    const data = { BVN: bvn, sessionCode: req.body.sessionCode, }

    const isBVN = await verifyCRBVN(data);

    if (isBVN.Message.includes("not found")) {
      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        company: req.body.companyName,
        category: req.body.category,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        businessType: req.body.businessType,
        businessEmail: req.body.email,
        uniqueID: codeGenerator("GA"),
        amountToPay: req.body.amountToPay,
        registrationNumber: req.body.registrationNumber,
        "guarrantor.fullname": req.body.fullName,
        "guarrantor.address": req.body.address,
        "guarrantor.relationship": req.body.relationship,
        "guarrantor.email": req.body.gEmailAddress,
        "guarrantor.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }
      return loan_mailer(data, res);
    } else {

      AccountOwnerRegistryIDs = isBVN.SearchResult[0].RegistryID;

      const creditData = { sessionCode: req.body.sessionCode, AccountOwnerRegistryIDs }
  
      const creditCheck = await checkScore(creditData);
  
      if (!creditCheck.Success) return res.status(400).json({ error: creditCheck.error });
  
      const creditScore = creditCheck.SMARTScoreResults[0].SMARTScores[0].Score
  
      if (creditScore <= 590) return res.status(400).json({ error: "You are not eligible to take a loan at the moment." });
      if (req.body.amount < 100000 || req.body.amount > 5000000) return res.status(400).json({ error: "You can only access between 100000 and 5000000 naira" });
      
      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        company: req.body.companyName,
        category: req.body.category,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        businessType: req.body.businessType,
        businessEmail: req.body.email,
        uniqueID: codeGenerator("GA"),
        amountToPay: req.body.amountToPay,
        registrationNumber: req.body.registrationNumber,
        "guarrantor.fullname": req.body.fullName,
        "guarrantor.address": req.body.address,
        "guarrantor.relationship": req.body.relationship,
        "guarrantor.email": req.body.gEmailAddress,
        "guarrantor.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }
      return loan_mailer(data, res);
    }

  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

// Salary loan
exports.salaryLoan = async (req, res) => {
  try {
    let AccountOwnerRegistryIDs;

    let existingUser = await User.findById({ _id: req.body.userId }).populate("bvnId").populate("employmentId").populate("bank");
    const accessibleAmount = 0.5 * req.body.monthlySalary;

    if (!existingUser) return res.status(400).json({ error: "Unknown user access. Please login properly to continue" });

    const isLoanTaken = existingUser.pendingLoan;

    if (isLoanTaken) return res.status(400).json({ error: "You currently have an outstanding loan to pay" });

    if (!existingUser.bank || !existingUser.bvnId || !existingUser.employmentId) return res.status(400).json({ error: "Please complete your profile and contr" });

    const bvn = existingUser.bvnId.bvn;

    const data = { BVN: bvn, sessionCode: req.body.sessionCode, }

    const isBVN = await verifyCRBVN(data);
  

    if (isBVN.Message.includes("not found")) {
      if (req.body.amount > accessibleAmount) return res.status(400).json({ error: "You cannot access more than 50% of your monthly salary" });

      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        amountToPay: req.body.amountToPay,
        workId: req.body.workId,
        uniqueID: codeGenerator("GA"),
        monthlySalary: req.body.monthlySalary,
        "hr.fullname": req.body.fullName,
        "hr.email": req.body.email,
        "hr.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }
      return loan_mailer(data, res)
      // return res.json({ status: "success", message: "Loan request success", data: creditCheck });
    } else {
      AccountOwnerRegistryIDs = isBVN.SearchResult[0].RegistryID;

      const creditData = { sessionCode: req.body.sessionCode, AccountOwnerRegistryIDs }
  
      const creditCheck = await checkScore(creditData); // To be completed when live APIs are ready
    
      if (!creditCheck.Success) return res.status(400).json({ error: creditCheck.error });
  
      const creditScore = creditCheck.SMARTScoreResults[0].SMARTScores[0].Score;
  
      if (creditScore <= 590) return res.status(400).json({ error: "You are not eligible to take a loan at the moment." });
      if (req.body.amount > accessibleAmount) return res.status(400).json({ error: "You cannot access more than 50% of your monthly salary" });
      
      let loan = new Loan({
        amount: req.body.amount,
        tenure: req.body.tenure,
        purpose: req.body.purpose,
        userId: req.body.userId,
        relManager: req.body.relManager,
        category: req.body.category,
        amountToPay: req.body.amountToPay,
        workId: req.body.workId,
        uniqueID: codeGenerator("GA"),
        "hr.fullname": req.body.fullName,
        "hr.email": req.body.email,
        "hr.phone": req.body.phoneNumber,
        "bank.accountNumber": req.body.accountNumber,
        "bank.accountType": req.body.accountType,
        "bank.bankName": req.body.bankName,
        "bank.accountName": req.body.accountName,
      });
  
      loan = await loan.save();
  
      if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
      const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id, pendingLoan: true }}, { new: true });
  
      if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
      const data = { loan, existingUser, subject: "New Loan request", text: "Loan request for processing" }
      return loan_mailer(data, res)
      // return res.json({ status: "success", message: "Loan request success", data: creditCheck });
    }
  } catch (error) {

    return res.status(400).json({ status: "fail", error: error.message });

  }
}

exports.getLoans = async (req, res) => {
  try {
    let items = await Loan.find().sort({ createdAt: -1 }).populate("userId").populate("bank").populate("guarrantor");
    const page = parseInt(req.query.page) || 1;
    const pager = paginate(items.length, page);
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex);
    return res.json({ pager, pageOfItems});
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.getLoansByCustomer = async (req, res) => {
  const { _id } = req.user;

  if (!_id) return res.status(400).json({ error: "We could not authenticate your account. Please login" });
  try {
    let endIndex;
    let items = await Loan.find({ category: req.query.category, userId: _id }).sort({ createdAt: -1 }).populate("userId").populate("bank").populate("guarrantor");
    const page = parseInt(req.query.page) || 1;
    const pager = paginate(items.length, page);

    endIndex = pager.endIndex === 0 ? 1 : pager.endIndex
    
    const pageOfItems = items.slice(pager.startIndex, endIndex);
    return res.json({ pager, pageOfItems});
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.getLoan = async (req,res) => {
  try {
    let loan = await Loan.findById({ _id: req.body.loanId }).populate("userId");
    if (!loan) return res.status(404).json({ status: "fail", message: "Record not found" });
    return res.json({ status: "success", doc: loan });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.approveLoan = (req, res) => {
  Loan.findByIdAndUpdate({ _id: req.body.loanId })
    .then(loan => {
      if (!loan) return res.status(404).json({ status: "fail", message: "Record not found" });
      loan.status = "approved";
      return loan.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ status: "fail", error: err.message });

        let approval = new Approval({
          approvedBy: req.body.approvedBy,
          dateApproved: new Date(),
          comment: req.body.comment,
          amountApproved: req.body.amountApproved,
          loanId: loan._id,
          disbursementStatus: "condition" ? true : false
        });

        return approval.save((err, doc) => {
          if (err || !doc) return res.status(400).json({ status: "fail", error: err.message });
          return res.json({ status: "success", message: "Loan approved" });
        });
      });
    })
    .catch(err => {
      return res.statu(400).json({ status: "fail", error: `Internal server error ${err.message}`});
    });
}

exports.fundAccount = async (req, res) => {
  try {
    const response = await exports.creditPerforming()
    // const response = await exports.verifyBVN();
    // const response = await getBanks();
    res.json(response)
    console.log(response, " inside the calling function");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
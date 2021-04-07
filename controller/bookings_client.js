const { User } = require("../models/user");
const { verifyCRBVN, checkScore } = require("../services/credit_scoring");
const { Loan } = require("../models/loan");
const { codeGenerator } = require("../services/code_generator");
const { loan_mailer } = require("../services/loan_mailer");

exports.createBookingsLoan = async (req, res) => {
  const {  
    bvn,
    email,
    phone,
    sessionCode,
    fullName,
  } = req.body;

  if (req.body.purpose === "") return res.status(400).json({ error: [{ msg: "Please tell us why you are taking a loan", param: "purpose", location: "body" }]});
  
  if (req.body.purpose && req.body.purpose.length <= 5) return res.status(400).json({ error: [{ msg: "Your reason is too short", param: "purpose", location: "body" }]});

  try {
    let newUser;
    
    let AccountOwnerRegistryIDs;

    let existingUser = await (await User.findOne({ email: req.body.email }));

    if (existingUser) {
      const isLoanTaken = existingUser.pendingLoan;

      if (isLoanTaken) return res.status(400).json({ error: "You currently have a pending loan" });
      
      const data = { BVN: bvn, sessionCode }

      const isBVN = await verifyCRBVN(data);

      if (isBVN.Message.includes("not found")) {
        let loan = new Loan();
          loan.amount = req.body.amount;
          loan.tenure = req.body.tenure;
          loan.purpose = req.body.purpose;
          loan.userId = existingUser._id;
          loan.category = "business";
          loan.company = "bookingsAfrica";
          category = req.body.category;
          loan.businessName = req.body.businessName;
          loan.businessAddress = req.body.businessAddress[0];
          loan.businessType = req.body.businessType;
          loan.businessEmail = req.body.businessEmail;
          loan.uniqueID = codeGenerator("GA");
          loan.amountToPay = req.body.amountToPay;
          loan.registrationNumber = req.body.registrationNumber;
          loan.bank.accountNumber = req.body.accountNumber;
          loan.bank.accountType = req.body.accountType;
          loan.bank.bankName = req.body.bankName;
          loan.bank.accountName = req.body.accountName;

        loan = await loan.save();

        if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
        const user = await User.findByIdAndUpdate({ _id: existingUser._id }, { $set: { loanId: loan._id, pendingLoan: true, isBooking: true }}, { new: true });
    
        if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
        const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }

        return loan_mailer(data, res);
        // return res.json({ status: "success", message: "Loan request success" });
      } else {
        AccountOwnerRegistryIDs = isBVN.SearchResult[0].RegistryID;

        const creditData = { sessionCode: req.body.sessionCode, AccountOwnerRegistryIDs }
    
        const creditCheck = await checkScore(creditData);
    
        if (!creditCheck.Success) return res.status(400).json({ error: creditCheck.error });
    
        const creditScore = creditCheck.SMARTScoreResults[0].SMARTScores[0].Score
    
        if (creditScore <= 590) return res.status(400).json({ error: "You are not eligible to take a loan at the moment." });

        let loan = new Loan();

        loan.amount = req.body.amount;
        loan.tenure = req.body.tenure;
        loan.purpose = req.body.purpose;
        loan.userId = existingUser._id;
        loan.category = "business";
        loan.company = "bookingsAfrica";
        category = req.body.category;
        loan.businessName = req.body.businessName;
        loan.businessAddress = req.body.businessAddress[0];
        loan.businessType = req.body.businessType;
        loan.businessEmail = req.body.businessEmail;
        loan.uniqueID = codeGenerator("GA");
        loan.amountToPay = req.body.amountToPay;
        loan.registrationNumber = req.body.registrationNumber;
        loan.bank.accountNumber = req.body.accountNumber;
        loan.bank.accountType = req.body.accountType;
        loan.bank.bankName = req.body.bankName;
        loan.bank.accountName = req.body.accountName;

        loan = await loan.save();
        if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
        const user = await User.findByIdAndUpdate({ _id: existingUser._id }, { $set: { loanId: loan._id, pendingLoan: true, isBooking: true }}, { new: true });
    
        if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
        const data = { loan, existingUser, subject: "Loan request", text: "Loan request for processing" }

        return loan_mailer(data, res);
        // return res.json({ status: "success", message: "Loan request success" });
      }
    } else {
      const firstName = fullName.split(" ")[0];
      const lastName = fullName.split(" ")[1];
      newUser = new User({ firstName, lastName, phoneNumber: phone, email, password: firstName+lastName, address: req.body.address });
      newUser = await newUser.save();

      const data = { BVN: bvn, sessionCode }

      const isBVN = await verifyCRBVN(data);

      if (isBVN.Message.includes("not found")) {
        let loan = new Loan();
          loan.amount = req.body.amount;
          loan.tenure = req.body.tenure;
          loan.purpose = req.body.purpose;
          loan.userId = newUser._id;
          loan.category = "business";
          loan.company = "bookingsAfrica";
          category = req.body.category;
          loan.businessName = req.body.businessName;
          loan.businessAddress = req.body.businessAddress[0];
          loan.businessType = req.body.businessType;
          loan.businessEmail = req.body.businessEmail;
          loan.uniqueID = codeGenerator("GA");
          loan.amountToPay = req.body.amountToPay;
          loan.registrationNumber = req.body.registrationNumber;
          loan.bank.accountNumber = req.body.accountNumber;
          loan.bank.accountType = req.body.accountType;
          loan.bank.bankName = req.body.bankName;
          loan.bank.accountName = req.body.accountName;

        loan = await loan.save();
        if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
        const user = await User.findByIdAndUpdate({ _id: newUser._id }, { $set: { loanId: loan._id, pendingLoan: true, isBooking: true }}, { new: true });
    
        if (!user) return res.status(400).json({ status: "fail", error: "User not found" });
        const data = { loan, existingUser: newUser, subject: "Loan request", text: "Loan request for processing" }

        return loan_mailer(data, res);
        // return res.json({ status: "success", message: "Loan request success" });
      } else {
        AccountOwnerRegistryIDs = isBVN.SearchResult[0].RegistryID;

        const creditData = { sessionCode: req.body.sessionCode, AccountOwnerRegistryIDs }
    
        const creditCheck = await checkScore(creditData);
    
        if (!creditCheck.Success) return res.status(400).json({ error: creditCheck.error });
    
        const creditScore = creditCheck.SMARTScoreResults[0].SMARTScores[0].Score
    
        if (creditScore <= 590) return res.status(400).json({ error: "You are not eligible to take a loan at the moment." });

        let loan = new Loan();
        
        loan.amount = req.body.amount;
        loan.tenure = req.body.tenure;
        loan.purpose = req.body.purpose;
        loan.userId = newUser._id;
        loan.category = "business";
        loan.company = "bookingsAfrica";
        category = req.body.category;
        loan.businessName = req.body.businessName;
        loan.businessAddress = req.body.businessAddress[0];
        loan.businessType = req.body.businessType;
        loan.businessEmail = req.body.businessEmail;
        loan.uniqueID = codeGenerator("GA");
        loan.amountToPay = req.body.amountToPay;
        loan.registrationNumber = req.body.registrationNumber;
        loan.bank.accountNumber = req.body.accountNumber;
        loan.bank.accountType = req.body.accountType;
        loan.bank.bankName = req.body.bankName;
        loan.bank.accountName = req.body.accountName;

        loan = await loan.save();

        if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
  
        const user = await User.findByIdAndUpdate({ _id: newUser._id }, { $set: { loanId: loan._id, pendingLoan: true, isBooking: true }}, { new: true });
    
        if (!user) return res.status(400).json({ status: "fail", error: "User not found" });

        const data = { loan, existingUser: newUser, subject: "Loan request", text: "Loan request for processing" }

        return loan_mailer(data, res);
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: `Internal Server Error ${error.message}`});
  }
}

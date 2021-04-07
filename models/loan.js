const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

// const amountEnum = [ 3000, 10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 1000000 ];

const bankEnum = [];

const loanSchema = new Schema({
  amount: { type: Number },
  purpose: { type: String },
  tenure: { type: String },
  userId: { type: ObjectId, ref: "User" },
  RelManager: { type: String },
  company: { type: String },
  monthlySalary: { type: Number },
  payDay: { type: Number, minlength: 2 },
  workId: { type: String },
  category: { type: String },
  businessName: { type: String, },
  businessAddress: { type: String },
  businessType: { type: String },
  registrationNumber: { type: String },
  businessEmail: { type: String },
  amountToPay: { type: Number },
  uniqueID: { type: String },
  hr: {
    fullname: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  guarrantor: {
    fullname: { type: String },
    address: { type: String },
    relationship: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  bank: {
    accountNumber: { type: Number, minlength: 16 },
    accountType: { type: String },
    accountName: { type: String },
    bankName: { type: String, enum: bankEnum }
  },
  status: { type: String, enum: [ "approved", "rejected", "pending" ], default: "pending" },
  approver: { type: ObjectId, ref: "Admin" }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);

exports.Loan = Loan;
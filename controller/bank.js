const { Bank } = require("../models/bank");
const { User } = require("../models/user");
const { getBanks } = require("../services/payment");

exports.createBank = async (req, res) => {
  try {
    const isBankExist = await Bank.findOne({ owner: req.body.userId });
    if (isBankExist) return res.status(400).json({ error: "Bank information already exist" });
    let bank = new Bank();

    bank.accountName = req.body.accountName;
    bank.name = req.body.bankName;
    bank.accountNumber = req.body.accountNumber;
    // bank.code = req.body.code;
    bank.accountType = req.body.accountType;
    bank.owner = req.body.userId;

    bank = await bank.save();
    if (!bank) return res.status(400).json({ status: "fail", error: "Request failed. Please try again after some time" });
    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { bank: bank._id }, $inc: { profilePercentage: +20 }}, { new: true });
    if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
    return res.json({ status: "success", message: "Bank information updated" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.getBanks = async (req, res) => {
  try {
    const banks = await getBanks();
    if (!banks) return res.status(400).json({ error: "Request failed. No data found" });
    return res.json(banks)
  } catch (error) {
    return res.status(400).json({ error: `Error occurred. ${error.message}`});
  }
}
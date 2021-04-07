const { BVN } = require("../models/bvn");
const { User } = require("../models/user");
const { verifyBVN, getBanks } = require("../services/payment");

exports.createBVN = async (req, res) => {
  try {
    const data = { bvn: req.body.bvn };
    const isValidBVN = await verifyBVN(data);
    const bvnExists = JSON.parse(isValidBVN);
    // bvnExists, isValidBVN.hasOwnProperty("message"), 
    if (bvnExists.status === "success" && bvnExists.data.bvn === "12345678901") {
      const isBVNExists = await BVN.findOne({ bvn: req.body.bvn });

      let user = await User.findById({ _id: req.user._id });
      if (!user) return res.status(404).json({ error: "User does not exist" });

      if (isBVNExists) return res.status(400).json({ error: "BVN already saved" });
      let newBVN = new BVN({
        bvn: req.body.bvn,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        userId: req.user._id
      });

      newBVN = await newBVN.save();
      if (!newBVN) return res.status(400).json({ error: "Failed to complete request. Please try again" });
      user.bvnId = newBVN._id;
      user.profilePercentage += 25;
      user = await user.save();
      return res.json({ message: "BVN added successfully" });
    }
    
    return res.status(404).json({ error: `The BVN ${req.body.bvn} is invalid` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getAllBVN = async (req, res) => {
  try {
    const bvn = await BVN.find({}).populate("userId");
    if (!bvn) return res.status(404).json({ error: "Records empty" });
    return res.json(bvn);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getBVN = async (req, res) => {
  try {
    const bvn = await BVN.findById({ _id: bvnId }).populate("userId");
    if (!bvn) return res.status(404).json({ error: "Records empty" });
    return res.json(bvn);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
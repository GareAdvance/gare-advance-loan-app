const { Employment } = require("../models/employment");
const { User } = require("../models/user");

exports.createEmploymentData = async (req, res) => {
  try {
    const isExist = await Employment.findOne({ userId: req.body.userId });
    
    if (isExist) {
      await Employment.findByIdAndDelete({ _id: isExist._id });
      await User.findByIdAndUpdate({ _id: req.body.userId }, { $inc: { profilePercentage: -20 }}, { new: true });
    } 
    
    let employment = new Employment();
    employment.employmentType = req.body.employmentType;
    employment.jopPosition = req.body.jobPosition;
    employment.company_address = req.body.company_address;
    employment.company_name = req.body.company_name;
    employment.userId = req.body.userId;
    
    employment = await employment.save();

    if (!employment) return res.status(400).json({ error: "Something went wrong. Please try again" });
    let user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { employmentId: employment._id }, $inc: { profilePercentage: +20}}, { new: true });
    if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
    return res.json({ status: "success", message: "User employment information updated" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}
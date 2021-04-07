const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { mailer } = require("../services/mailer");


exports.createUser = async (req, res) => {
  try {
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) return res.status(400).json({ error: `A user with the ${req.body.email} already exists` });
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    if (!hashedPassword) return res.status(400).json({ error: "Could not hash password. Please try again" });
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      how_you_hear_about_us: req.body.how_you_hear_about_us,
    });

    user = await user.save();

    if (!user) return res.status(400).json({ error: "Failed to register user. Please try again" });
    return exports.sendToken(req, res, user.email);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.sendToken = async (req, res, email) => {
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: `User with the email ${email} not found` });
    // generate email verification token with expiration time of 120 minutes
    const token = jwt.sign({ _id: user._id }, process.env.EMAIL_ACTIVATION_KEY, { expiresIn: "120m" });
    // create an email verification link with the token created above
    const link = `${process.env.CLIENT_URL}/verify_email/${token}`;
    user.email_verification_token = token;
    user = await user.save();

    const data = {
      from: "no-reply@gare.com",
      to: user.email,
      subject: "Email Verification",
      text: "Gare Finance",
      html: `
        <h3>Hi ${user.firstName}</h3>
        <p>Please click on the following link or copy and paste in your browser ${link} to verify your email.</p>
      `
    }
    return mailer(data, res);
  } catch (error) {
    return res.status(400).json({ error: "Internal server error"})
  }
}

// verify email address
exports.verifyEmail = async (req, res) => {
  const { email_verification_token } = req.body;

  try {
    if (email_verification_token) {
      jwt.verify(email_verification_token, process.env.EMAIL_ACTIVATION_KEY, async (err, decodedData) => {
        if (!decodedData) return res.status(401).json({ error: "Invalid verification token or token has expired" });
  
        let user = await User.findOne({  email_verification_token });
       
        if (!user) return res.status(404).json({ error: "User with the token does not exist" });
        user.email_verified = true;
        user.email_verification_token = null;
        user = await user.save();
        if (!user) return res.status(400).json({ error: "Internal server error"});
        
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "14days"});

        const { email, firstName, lastName, phoneNumber, email_verified, _id } = user;
        res.cookie("token", token, { expiresIn: "2days" });
        return res.header("x-auth-token", token).json({ token, user: { email, firstName, lastName, phoneNumber, _id, email_verified }});
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.otherPersonalDetails = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.body.userId });
    if (!user) return res.status(404).json({ error: `User does not exist` });
    if (req.body.firstName) user.firstName  = req.body.firstName;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.maritalStatus) user.maritalStatus = req.body.maritalStatus;
    if (req.body.address) user.address = req.body.address;
    if (req.body.dateOfBirth) user.dateOfBirth = req.body.dateOfBirth;
    if (req.body.meansOfIdentification) user.meansOfIdentification = req.body.meansOfIdentification;
    if (!user.personalInfoUpdated) {
      user.profilePercentage += 35;
      user.personalInfoUpdated = true;
    }

    const updatedUser = await user.save();
    if (!updatedUser) return res.status(400).json({ error: "Failed to update user information. Please try again" });

    return res.json({ message: "Information updated" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Fetch all users
exports.getUsers = async (req, res) => {
  let users;

   try {
     users = await User.find({}).populate("employmentId").populate("bankId").populate("attestationId")

     if (!users) return res.status(404).json({ status: "fail", error: "No records found" });
     return res.json(users);
   } catch (error) {
     return res.status(400).json({ status: "fail", error: error.message });
   }
}
 
exports.getUser = async (req, res) => {
  const { userId } = req.body;
  if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: "Invalid userId"});

  let user;
  try {
    user = await (await User.findById({ _id: userId }).populate("employmentId").populate({ path: "bank", populate: { path: "owner" }}).populate("attestationId").populate("bvnId"));
    if (!user) return res.status(404).json({ status: "fail", error: "Not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: "Invalid user ID" });

  User.findByIdAndDelete({ userId }, (err, doc) => {
    if (err || !doc) return res.status(400).json({ error: `User not found` });
    return res.json({ status: "success", message: "User account deleted" });
  });
}

exports.changePassword = async (req, res) => {
  // console.log(req.body)
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User does not exist" });
    let passwordExists = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!passwordExists) return res.status(400).json({ error: "We could not find any account with your old password" });
    let newPassword = await bcrypt.hash(req.body.newPassword, 12);
    user.password = newPassword;
    user = await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Request failed. Try again" });
  }
}

exports.uploader = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { photo: req.body.photo }}, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
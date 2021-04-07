const jwt = require("jsonwebtoken");
const app = require("../server");
const { OAuth2Client } = require("google-auth-library");
const { Admin } = require("../models/admin");
const { User } = require("../models/user");
const { mailer } = require("../services/mailer");
const { sms } = require("../services/sms");
const { codeGenerator } = require("../services/code_generator");
const bcrypt = require("bcrypt");
const axios = require("axios");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = codeGenerator();
  const message = `Your phone verification token is: ${otp}`;
  const data = {
    phone,
    message
  }

  const response = await sms(data);

  return res.json(response);
}

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const { userType } = req.params;
  let Account;

  switch(userType) {
    case "user": 
      Account = User;
      break;
    case "admin": 
      Account = Admin;
      break;
    default: return res.status(403).json({ error: "Unknown user type"  });
  }

  Account.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ error: "User already exists" });
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Could not hash password" });
          let newUser = new Account({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.params.userType
          });
          const code = codeGenerator();
          newUser.verificationCode = code;
          newUser.save()
            .then(async (resp) => {
              if (!resp) return res.status(400).json({ error: "Failed to save user" });
              const emailData = {
                subject: "Email verification code",
                sender: "no-reply@mail.com",
                receiver: req.body.email,
                message: `<p>Your email verification code is: ${code}`,
              }
            mailer(emailData, res);
            return res.json({ message: `A verification code was sent to your email`, resp, code });
            });
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  const { userType } = req.params;

  let Account;
  if (!userType) return res.status(400).json({ error: "Invalid parameter value userType" });
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!password) return res.status(400).json({ error: "Your password is required" });

  switch(userType) {
    case "user":
      Account = User;
      break;
    case "admin":
      Account = Admin;
      break;
    default: return res.status(403).json({ error: "Unknown user type" });
  }

  Account.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User does not exist" });
      return bcrypt.compare(password, user.password)
        .then(async (matched) => {
          if (!matched) return res.status(400).json({ error: "Invalid password. Please check and try again" });
          // generate authentication token for the user
          const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "14days"});

          const { email, firstName, lastName, phoneNumber, _id, email_verified } = user;
          res.cookie("token", token, { expiresIn: "2days"});
          res.header("x-auth-token", token).json({ token, user: { email, firstName, lastName, phoneNumber, email_verified, _id }});
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.verifyCode = (req, res) => {
  const { code, userType } = req.params;
  let Account;
  if (!code) return res.status(400).json({error: "Invalid code sent. Check and try again" });
  if (!userType) return res.status(400).json({ error: "Unknown user type" });

  switch(userType) {
    case "user":
      Account = User;
      break;
    case "admin":
      Account = Admin;
      break;
    default: return res.status(403).json({ error: "Unknown user type" });
  }

  const toNum = Number(code);

  Account.findOne({ code: toNum })
    .then(user => {
      if (!user) return res.status(400).json({ error: "Invalid code or the code has expired" });
      user.code = null;
      user.verificationCodeExpires = null;
      user.emailVerified = true;
      user.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Email verified" });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  const { userType } = req.params;
  if (!userType) return res.status(400).json({ error: "User type is required" });

  let Account;

  switch(userType) {
    case "user":
      Account = User;
      break;
    case "admin":
      Account = Admin;
      break;
    default: return res.status(403).json({ error: "Unknown user type" });
  }

  Account.findOne({ email })
    .then(user => {
      if (!user) return res.status(404).json({ error: 'The email address ' + req.body.email + ' does not exist.'});

      //Generate and set password reset token
      user.resetPasswordToken = jwt.sign({ firstName: user.firstName }, process.env.SECRET_KEY, { expiresIn: "20m" });
      user.resetPasswordExpires = Date.now() + 3600000
      // Save the updated user object
      user.save()
        .then(user => {
          // send email
          let link = `http://${req.headers.origin}/reset_password/${user.resetPasswordToken}`;
          const receiver = user.email;
          const text = "Gare Finance";
          const sender = "noreply@mail.com";
          const subject = "Password change request";
          const message = `Hi ${user.firstName} \n 
          You sent a password reset request. Please click on the following link ${link} to reset your password. \n\n 
          If you did not request this, please ignore this email and your password will remain unchanged.\n`;

          const data = {
            to: receiver,
            from: sender,
            subject,
            text,
            html: message
          }
          return mailer(data, res);
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ error: err.message});
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message })
    });
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  const { userType } = req.params;
  let Account;
  if (!userType) return res.status(400).json({ error: "Unknown user type" });
  switch(userType) {
    case "user":
      Account = User;
      break;
    case "admin":
      Account = Admin;
      break;
    default: return res.status(403).json({ error: "Unknown user type" });
  }

  Account.findOne({ resetPasswordToken: req.body.token })
    .then((user) => {
        if (!user) return res.status(401).json({ error: 'Password reset token is invalid or has expired.'});
      return bcrypt.hash(req.body.password, 12)
        .then(hashPassword => {
          //Set the new password
          user.password = hashPassword;
          user.resetPasswordToken = undefined;

          // Save
          user.save((err, doc) => {
            if (err) return res.status(500).json({ error: err.message});
            // send email
            const to = user.email;
            const from = "";
            const subject = "Password change confirmation";
            const text = "Password change confirmation";
            const message = `Hi ${user.firstName} \n 
            This is a confirmation that the password for your account ${user.email} has just been changed.\n`;

            const data = {
              to,
              from,
              subject,
              message,
              text
            }
            return mailer(data, res);
          });
        })
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
};

exports.creditLogin = async (req, res) => {
  const config = {
    EmailAddress: process.env.CREDIT_EMAIL,
    Password: process.env.CREDIT_PASSWORD,
    SubscriberID: process.env.CREDIT_SUBCRIBER_ID,
  }

  try {
    const response = await axios.post(`https://api.creditregistry.org/nigeria/AutoCred/v7/api/Agents/Login`, config);
    const data = response.data;
    if (!data.Success) return res.status(400).json({ error: "Failed to login to credit registry" });
    
    return res.json({ message: "Login success", sessionCode: data.SessionCode });
  } catch (error) {
    return res.status(400).json({ error: "Server Error " + error.message });
  }
}
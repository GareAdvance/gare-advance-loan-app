const sgMail = require('@sendgrid/mail');
const { template } = require('./template');
const key = require("../config/key");
// const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.loan_mailer = async (data, res) => {

  const msg = {
    to: key.gare_bookings_email,//"onojamatthew59@gmail.com",//,
    from: process.env.SENDER_EMAIL, // Use the email address or domain you verified on sendgrid account
    subject: data.subject,
    text: data.text,
    html: template(data),
  };
  // console.log("after the message object")
  //ES6
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email was sent successfully");
      return res.json({ status: "success", message: "Loan request success" });
    })
    .catch( error => {
      // console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
}


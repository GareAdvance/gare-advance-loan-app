const sgMail = require('@sendgrid/mail');
const key = require("../config/key");
// const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.mailer = async (data, res) => {
  
// console.log("inside the mailer file")
  // pathToAttachment = __dirname + "/uploads/Matthew_Resume.pdf";
  // console.log(pathToAttachment)

  // attachment = fs.readFileSync(pathToAttachment);

  // attachment.toString("base64");

  // console.log(pathToAttachment, attachment, " the file and path")
  const msg = {
    to: data.to,
    from: key.sendgrid_email, // Use the email address or domain you verified on sendgrid account
    subject: data.subject,
    text: data.text,
    html: data.html, //`<p>Just the html text</p>`,
    // attachments: [
    //   {
    //     content: attachment,
    //     filename: "Matthew_Resume.pdf",
    //     type: "application/pdf",
    //     disposition: "attachment",
    //     content_id: "content",
    //   }
    // ]
    // html: data.html,
  };
  // console.log("after the message object")
  //ES6
  sgMail
    .send(msg)
    .then(() => {
      return res.json({ message: "Success" });
    })
    .catch( error => {
      // console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
}



exports.template = (data) => {
  // console.log(data.loan, " this is the loan", data.existingUser, " this is the user data")

  // {
  //   bank: {
  //     accountNumber: 33432244,
  //     bankName: 'first bank',
  //     accountName: 'Matthew Igoche'
  //   },
  //   status: 'pending',
  //   _id: 605db0ff18eceb437cc3caaf,
  //   amount: 400000,
  //   tenure: '2',
  //   userId: 605db0fd18eceb437cc3caae,
  //   category: 'business',
  //   company: 'bookingsAfrica',
  //   businessName: 'fintech',
  //   businessAddress: '23 Olelu Street',
  //   businessEmail: 'business@gmail.com',
  //   uniqueID: '1727971GA',
  //   registrationNumber: '43438934j434',
  //   createdAt: 2021-03-26T10:01:35.086Z,
  //   updatedAt: 2021-03-26T10:01:35.086Z,
  //   __v: 0
  // }  this is the loan
  
  // {
  //   profilePercentage: 0,
  //   email_verified: false,
  //   personalInfoUpdated: false,
  //   pendingLoan: false,
  //   isBooking: false,
  //   _id: 605db0fd18eceb437cc3caae,
  //   firstName: 'Onoja',
  //   lastName: 'Matthew',
  //   phoneNumber: '09023456776',
  //   email: 'onoja@gmail.com',
  //   password: 'OnojaMatthew',
  //   address: 'some where in Nigeria',
  //   createdAt: 2021-03-26T10:01:33.248Z,
  //   updatedAt: 2021-03-26T10:01:33.248Z,
  //   __v: 0
  // }  

  // amount: { type: Number, min: 3000, max: 1000000 },
  // purpose: { type: String },
  // tenure: { type: String },
  // userId: { type: ObjectId, ref: "User" },
  // RelManager: { type: String },
  // company: { type: String },
  // monthlySalary: { type: Number },
  // payDay: { type: Number, minlength: 2 },
  // workId: { type: String },
  // category: { type: String },
  // businessName: { type: String, },
  // businessAddress: { type: String },
  // businessType: { type: String },
  // registrationNumber: { type: String },
  // businessEmail: { type: String },
  // amountToPay: { type: Number },
  // uniqueID: { type: String },
  // hr: {
  //   fullname: { type: String },
  //   email: { type: String },
  //   phone: { type: String }
  // },
  // guarrantor: {
  //   fullname: { type: String },
  //   address: { type: String },
  //   relationship: { type: String },
  //   email: { type: String },
  //   phone: { type: String },
  // },
  // bank: {
  //   accountNumber: { type: Number, minlength: 16 },
  //   accountType: { type: String },
  //   accountName: { type: String },
  //   bankName: { type: String, enum: bankEnum }
  // },

  let workInformation;
  let guarrantor;
  let businessInformation;

  workInformation = data.loan.monthlySalary ? 
  `<div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
      <table style="padding-left: 100px;">
        <thead>
          <th style="left: 160px;
          width: 450px;
          height: 24px;
          font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0);
          text-align: left;
          font: normal normal 600 20px/21px Gilroy ☞;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;">Work Information</th>
        </thead>
        <tbody>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Name Of Company:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.campany}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Monthly Salary:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.monthlySalary}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Monthly Payday:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.payDay}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Work Address:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.companyAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ` : null;

  guarrantor = data.loan.guarrantor.fullName ? 
  `<div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
      <table style="padding-left: 100px;">
        <thead>
          <th style="left: 160px;
          width: 450px;
          height: 24px;
          font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0);
          text-align: left;
          font: normal normal 600 20px/21px Gilroy ☞;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;">Work Information</th>
        </thead>
        <tbody>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Full Name:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.guarrantor.fullname}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Relationship</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.guarrantor.relationship}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Phone number:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.guarrantor.phone}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Email Address:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.guarrantor.email}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Permanent Address:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.guarrantor.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ` : data.loan.category === "salary" ? 
  `<div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
      <table style="padding-left: 100px;">
        <thead>
          <th style="left: 160px;
          width: 450px;
          height: 24px;
          font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0);
          text-align: left;
          font: normal normal 600 20px/21px Gilroy ☞;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;">Work Information</th>
        </thead>
        <tbody>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Full NAme:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.fullName}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Phone Number:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.phone}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Monthly Payday:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.email}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Work Address:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.companyAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ` : data.loan.category === "personal" ? 
  `<div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
      <table style="padding-left: 100px;">
        <thead>
          <th style="left: 160px;
          width: 450px;
          height: 24px;
          font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0);
          text-align: left;
          font: normal normal 600 20px/21px Gilroy ☞;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;">Work Information</th>
        </thead>
        <tbody>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Full NAme:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.fullName}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Phone Number:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.phone}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Monthly Payday:</td>
            <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.hr.email}</td>
          </tr>
          <tr>
            <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
            letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Work Address:</td>
            <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
            font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.companyAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ` : null;


  businessInformation = data.loan.category === "business" ? 
  `<div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
    <table style="padding-left: 100px;">
      <thead>
        <th style="left: 160px;
        width: 450px;
        height: 24px;
        font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
        letter-spacing: var(--unnamed-character-spacing-0);
        text-align: left;
        font: normal normal 600 20px/21px Gilroy ☞;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;">Business Information</th>
      </thead>
      <tbody>
        <tr>
          <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Business name:</td>
          <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
          font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.businessName}</td>
        </tr>
        <tr>
          <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Business type:</td>
          <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
          font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.businessType}</td>
        </tr>
        <tr>
          <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Registration Number:</td>
          <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
          font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.registrationNumber}</td>
        </tr>
        <tr>
          <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Business email:</td>
          <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
          font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.businessEmail}</td>
        </tr>
        <tr>
          <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Business Address:</td>
          <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
          font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.businessAddress}</td>
        </tr>
      </tbody>
    </table>
  </div>
` : null;


  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <div style="width: 63%; margin: 0 auto;">
          <h2 style="top: 422px; left: 99px; height: 50px; margin-left: 99px; font: var(--unnamed-font-style-normal) normal bold 41px/44px var(--unnamed-font-family-gilroy-☞);
          letter-spacing: var(--unnamed-character-spacing-0);
          color: var(--unnamed-color-e87c23);
          text-align: left;
          font: normal normal bold 41px/44px Gilroy ☞;
          letter-spacing: 0px;
          color: #E87C23;
          opacity: 1;">LOAN REQUEST RECEIVED</h2>
          <table style="padding-left: 100px;">
            <thead>
              <th style="left: 160px;
              width: 450px;
              height: 24px;
              font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
              letter-spacing: var(--unnamed-character-spacing-0);
              text-align: left;
              font: normal normal 600 20px/21px Gilroy ☞;
              letter-spacing: 0px;
              color: #000000;
              opacity: 1;">LOAN REQUEST DETAILS ARE AS FOLLOWS:</th>
            </thead>
            <tbody>
              <tr>
                <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Loan ID:</td>
                <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.uniqueID}</td>
              </tr>
              <tr>
                <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Loan Type:</td>
                <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.category}</td>
              </tr>
            </tbody>
          </table>

          <div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
            <table style="padding-left: 100px;">
              <thead>
                <th style="left: 160px;
                width: 450px;
                height: 24px;
                font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                letter-spacing: var(--unnamed-character-spacing-0);
                text-align: left;
                font: normal normal 600 20px/21px Gilroy ☞;
                letter-spacing: 0px;
                color: #000000;
                opacity: 1;">PERSONAL INFORMATION</th>
              </thead>
              <tbody>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Full Name:</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.existingUser.firstName} ${data.existingUser.lastName}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">EMail address:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.existingUser.email}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Phone number:</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.existingUser.phoneNumber}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Permanent address:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.existingUser.address}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">bank Verification No</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.existingUser.bvn}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
            <table style="padding-left: 100px;">
              <thead>
                <th style="left: 160px;
                width: 450px;
                height: 24px;
                font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                letter-spacing: var(--unnamed-character-spacing-0);
                text-align: left;
                font: normal normal 600 20px/21px Gilroy ☞;
                letter-spacing: 0px;
                color: #000000;
                opacity: 1;">Loan Information</th>
              </thead>
              <tbody>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Loan type</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.category.charAt(0).toUpperCase() + data.loan.category.slice(1)} loan</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Amount</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">NGN${data.loan.amount}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Rate</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">6%</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Total Repayment:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.amountToPay}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Tenure</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.tenure} months</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Relationship manager:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.relManager}</td>
                </tr>
                
              </tbody>
            </table>
          </div>

          <div>${workInformation}</div>

          <div>${guarrantor}</div>
          <div>${businessInformation}</div>

          <div style="padding: 50px; margin: 0 auto; margin-bottom: 50px;margin-top: 50px; background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #00000033;  opacity: 1;left: 99px; width: 92%;overflow: hidden;">
            <table style="padding-left: 100px;">
              <thead>
                <th style="left: 160px;
                width: 450px;
                height: 24px;
                font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                letter-spacing: var(--unnamed-character-spacing-0);
                text-align: left;
                font: normal normal 600 20px/21px Gilroy ☞;
                letter-spacing: 0px;
                color: #000000;
                opacity: 1;">Account Information</th>
              </thead>
              <tbody>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Name of bank:</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.bank.bankName}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Account type:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.bank.accountType}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Account Number</td>
                  <td style="left: 362px;padding-top: 42px; width: 137px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.bank.accountNumber}</td>
                </tr>
                <tr>
                  <td style="left: 160px; padding-top: 42px; width: 74px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞);
                  letter-spacing: var(--unnamed-character-spacing-0); color: var(--unnamed-color-0b70a5); text-align: left; font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #0B70A5;  opacity: 1;">Account name:</td>
                  <td style="left: 362px;padding-top: 42px; width: 200px; height: 24px; font: var(--unnamed-font-style-normal) normal 600 20px/21px var(--unnamed-font-family-gilroy-☞); letter-spacing: var(--unnamed-character-spacing-0); text-align: left;
                  font: normal normal 600 20px/21px Gilroy; letter-spacing: 0px; color: #000000; opacity: 1;">${data.loan.bank.accountName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
}
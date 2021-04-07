require("dotenv").config();
const Ravepay = require('flutterwave-node');
const fetch = require("node-fetch");

const PUBLICK_KEY = process.env.FLW_PUB_KEY;
const SECRET_KEY = process.env.FLW_SEC_KEY;

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  false);
let refIdNumber;

// This handles fund transfers to customer accounts
exports.transfer = async (res) => {
  // bankCode "044", accountNumber "0690000044", amount 500, currency "NGN"
 
  try {
    const payload = {
      "account_bank": "HighStreet MFB bank", //data.bankCode,
      "account_number": "1352014535", //data.accountNumber,
      "amount": "2000",//data.amount,
      "narration": "Flutterwave Account Funding",
      "currency": "NGN", //data.currency,
      "reference": "trans-"+ Date.now()
    }
    const response = await rave.Transfer.initiate(payload);
    console.log(response);
    return res.json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// BVN verification
exports.verifyBVN = async (data) => {
  const payload = {
    bvn: "12345678901", //data.bvn
  }

  try {
    const response =  await rave.Bvn.verification(payload);
    return response;
  } catch (error) {
    console.log(error)
  }      
}


exports.chargeCard = async (res) => {
  // const { amount, firstName, lastName, email, phone, cvv, expMonth, expYear, cardNo, pin, currencyType, ip, fingerPrint } = req.body;
  // newAmount = amount;
  // const { customerId, role } = req.params;
  // if (!customerId) return res.status(400).json({ error: "Please log in and try again" });
  // if (!roles.includes(role)) return res.status(400).json({ error: "Only customer can call this api" });
  // const metavalue = Math.floor(1000000 + Math.random() * 900000);

  const payload = {
    "cardno": "5531886652142950", //cardNo,
    "cvv": "564",//cvv,
    "expirymonth": "09",// expMonth,
    "expiryyear": "32",//expYear,
    "currency": "NGN",// currencyType,
    "pin": "3310",//pin,
    "country": "NG",
    "amount": "2000", //amount,
    "email": "user@gmail.com", //email,
    "phonenumber": "09025930109",//phone,
    "suggested_auth": "PIN",
    "firstname": "temi",//firstName,
    "lastname": "desola", //lastName,
    "IP": "41.184.46.31",
    "txRef": "DC-" + Date.now(),
    "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
  };
  
    rave.Card.charge(payload).then(async (resp) => {
      let 
          ref,
          errorMessage;
  
        if (resp.body && resp.body.data && resp.body.data.flwRef) {
          
          ref = resp.body.data.flwRef;
          refIdNumber = ref;
          res.json({ message: "OTP sent"});
        } 
        else {
          errorMessage = new Error(`Could not get response. Check your network!`);
          throw errorMessage;
        }
        
      }).catch(err => {
        return res.json(`Error: Could not get Transaction-REF, ${err}`);
    });
}

// Verify payment OTP
exports.verifyOTP = (req, res) => {

  const token = req.body.otp;
  console.log(refIdNumber, "transaction ref number")
  const payload2 = {
    "PBFPubKey": process.env.PUBLICK_KEY,
    "transaction_reference": refIdNumber,
    "otp": token
  }

  rave.Card.validate(payload2).then(resp => {
    if (resp.body.status === "success" && resp.body.message == "Charge Complete") {
      let payload3 = {
        "flwref": refIdNumber
      }
      rave.Status.requery(payload3)
        .then(resp => {
          //after validation, do a check if transaction is complete
          if (resp.body.status === "success") {
            return res.json({ status: resp.body.status, message: "Payment completed" });
            // Customer.findByIdAndUpdate({ _id: customerId})
            //   .then(customer => {
            //     if (!customer) return res.status(400).json({ error: "Customer not found" });
            //     customer.balance += newAmount;
            //     customer.save((err, doc) => {
            //       if (err || !doc) return res.status(400).json({ error: err.message });
            //       let amount = newAmount;
            //       let newTxn = new Transaction({ amount, txnType, txnTitle, customerId, role });
            //       return newTxn.save((err, doc) => {
            //         if (err || !doc) return res.status(400).json({ error: err.message });
            //         res.json({ message: "Payment complete", newTxn });
            //       });
            //     });
            //   })
            //   .catch(err => {
            //     return res.status(400).json({ error: err.message });
            //   });
          }
        })
        .catch(err => {
          res.status(400).json({ error: err.message });
        });
    }
  }).catch(err => {
      return res.json(`Error: Could not validate Transaction ${err}`);
  });
} 

// gets list of banks in Nigeria
exports.getBanks = async () => {
  try {
		const response = await rave.Misc.getBanks(rave);
    return response;
	} catch (error) {
		console.log(error);
	}
}

// Fetch list of successful transfers
exports.transferList = () => {
  const listTransfer = async () => {
    try {
        const payload={
            "page":1,
            "status":"successful" //This allows you fetch only transfers with a specific status e.g. fetch all successful transactions. Possible values are failed, successful
        }
        const response = await rave.Transfer.list(payload)
        console.log(response)
 
    } catch (error) {
        console.log(error)
    }
  }
  listTransfer();
}

// Gets account balance
exports.accountBalance = async (currency) => {
  // "NGN"
  try {
    const payload={ "currency": currency.name }
    const response = await rave.Transfer.getBalance(payload);
    console.log(response)

  } catch (error) {
    console.log(error)
  }
}

 

// Create a subaccount on flutterwave
exports.createSubaccount = async (data) => {
  /**
   * account_bank "044", accountNumber "0690000035", businessName "JK Services", 
   * businessEmail "jk@services.com", businessContact "Seun Alade" buisnessMobile "09087930450"
   * country "NG"
   */
  // 
  const payload = {
    "account_bank": data.bankCode,
    "account_number": data.accountNumbaer,
    "business_name": data.businessName,
    "business_email": data.businessEmail,
    "business_contact": data.businessContact,
    "business_contact_mobile": data.businessContactMobile,
    "business_mobile": data.businessMobile,
    "country": data.country,
    "meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
  }

  try {
    const response =  await rave.Subaccount.create(payload)
    console.log(response);
  } catch (error) {
    console.log(error)
  }                            
}

// Get list of subAccount
exports.getSubaccount = async (data) => {
  const payload = {
      "id": data.subaccountID//"RS_467808290FFEC932CBE097DD5097A2"
  }

  try {
      const response = await rave.Subaccount.fetch(payload)
      console.log(response);
  } catch (error) {
      console.log(error)
  }
}

// updates a subaccount
exports.updateSubaccount = async (data) => {
  const payload = 	{
    "id": data.subaccountID, // "RS_C5B5E474258921E0BD524C12A5008DA1", //The is the subaccount ID, you can get it from the List Subaccount 
    "account_number": data.accountNumber,  //"0690000034",
    "business_name": data.businessName, // "Synergy Alliance",
    "business_email": data.businessEmail, // "ted@synergyalliance.com",
    "account_bank": data.bankCode, //"044",
    "split_type": data.splitType, // "flat",
    "split_value": data.splitValue, // "200"
  }
  try {
      const response = await rave.Subaccount.update(payload)
      console.log(response);
  } catch (error) {
      console.log(error)
  }
}

// creates payment plan
exports.paymentPlan = async (data) => {
  const payload = { 
    amount: data.amount, //'10',
    name: data.planName, //'fosm',
    interval: data.interval, //'daily',
    duration: data.duration, // 5,
  }

  try {
    const response = await rave.Paymentplan.create(payload,{ json: true });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// List of payment plans
exports.paymentPlanList = async () => {
  rave.Paymentplan.list() 
    .then(resp => {
      console.log(resp.body);
        
    }).catch(err => {
      console.log(err);
        
    });
}

// Fetches a single payment plan
exports.fetchSinglePlan = async (data) => {
  try {
    const response = await rave.Paymentplan.fetch(plan_id);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// Cancels a payment plan 
exports.cancelPlan = async () => {
  const payload = {
    "id": 912,
  }

  try {
    const response = await rave.Paymentplan.cancel(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  
}

// Gets exchange rates 
exports.exchangeRate = async (data) => {
  const payload = {
    service: "rates_convert",
    service_method: "post",
    service_version: "v1",
    service_channel: "transactions",
    service_channel_group: "merchants",
    service_payload: {
      FromCurrency: data.from, //"USD",
      ToCurrency: data.to, //"NGN",
      Amount: data.amount,// 5000
    }
  };
  try {
  const response = await rave.Misc.exchange_rates(payload);
  console.log(response);
  } catch (error) {
  console.log(error);
  }
}

// get list transaction 
exports.getTransactionList = async () => {
  const payload = {
    from: "2019-01-01",
    to: "2020-03-30",
    currency: "NGN",
    status: "successful" //"failed"
  };
  try {
    const response = await rave.Misc.list_transactions(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// get service charge 
exports.getServiceCharge = async () => {
  const payload = {
    amount: 5000,
    currency: "NGN",
  };
  try {
    const response = await rave.Misc.getFee(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


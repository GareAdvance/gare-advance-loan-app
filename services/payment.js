require("dotenv").config();
const Ravepay = require('flutterwave-node');
const key = require("../config/key");

const PUBLICK_KEY = key.flw_pub_key;
const SECRET_KEY = key.flw_sec_key;

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  false);

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
    bvn: data.bvn, //data.bvn
  }

  try {
    const response =  await rave.Bvn.verification(payload);
    return response;
  } catch (error) {
    console.log(error)
  }      
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


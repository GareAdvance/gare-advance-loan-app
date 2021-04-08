const axios = require("axios");
const key = require("../config/key");

// Checks credit score with credit registry
exports.checkScore = async (data) => {
  const date = new Date();

  const options = {
    "SessionCode": data.sessionCode,
    "AccountOwnerRegistryIDs": data.AccountOwnerRegistryIDs,
    "CreditScoreEnquiryReason": "KYCCheck",
    "PositiveScoreFactorCount": 0,
    "NegativeScoreFactorCount": 0,
    "RetroDate": date,
    "ScoreModel": "Consumer",
    "ScoreType": "Generic",
    "EnquiryLoanAmount": 0,
  }
  try {
    const response = await axios.post(`${key.credit_reg_base_url}/SMARTScore3/GetScore`, options);
    
    return response.data;
  } catch (error) {
    return { error: error.message }
  }
}

// Checks credit performance with credit registry
exports.creditPerforming = async (data) => {
  try {
    const config = {
      "SessionCode": data.sessionCode,
      "AccountOwnerRegistryIDs": data.AccountOwnerRegistryIDs,
      "CreditEnquiryReason": "KYCCheck",
      "EnquiryLoanAmount": 0
    }

    const response = await axios.post(`${key.credit_reg_base_url}/SMARTScore3/IsPerforming`, config);

    return response.data;

  } catch (error) {
    return { error: error.message }
  }
}

// Verify BVN with credit registry
exports.verifyCRBVN = async (data) => {
  try {
    const config = {
      "MaxRecords": 100, 
      "MinRelevance": 0, 
      "SessionCode": data.sessionCode, 
      "BVN": data.BVN
    }
    const bvnData = await axios.post(`${key.credit_reg_base_url}/Customers/FindByBVN2`, config);

    if (!bvnData) return res.status(400).json({ error: "BVN validation failed" });

    return bvnData.data;

  } catch (error) {
    return { error: error.message }
  }
}
import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Modal, ModalBody, Spinner, Alert } from "reactstrap";
import { Button, Steps } from "antd";
import "./Business.css";
import LoanComponent from "./LoanComponent";
import BusinessInformation from "./BusinessInformation";
import GuarantorInformation from "./GuarantorInformation";
import AccountInformation from "./AccountInformation";
import { localStorageAuth } from "../../../../helper/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { businessLoan } from "../../../../store/actions/actions_loan";



const { Step } = Steps;

const BusinessLoan = ({ userDetails }) => {
  const loan = useSelector(state => state.loan);
  const dispatch = useDispatch();
  const [ count, setCount ] = useState(0);
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ amount, setAmount ] = useState(0);
  const [ tenure, setTenure ] = useState(0);
  const [ purpose, setPurpose ] = useState("");
  const [ relManager, setRelManager ] = useState("");
  const [ emailAddress, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ businessName, setBusinessName ] = useState("");
  const [ registrationNumber, setRegistrationNumber ] = useState("");
  const [ businessAddress, setBusinessAddress ] = useState("");
  const [ businessType, setBusinessType ] = useState("");
  const [ companyName, setCompanyName ] = useState("");
  

  const [ relationship, setRelationship ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ fullName, setFullName ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ gEmailAddress, setGEmailAmail ] = useState("");
  const [ bankName, setBankName ] = useState("");
  const [ accountName, setAccountName ] = useState("");
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ accountType, setAccountType ] = useState("");
  const [ monthlyRemitance, setMonthlyRemittance ] = useState(0);
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const [ error, setError ] = useState("");
  const [ confirmation, setConfirm ] = useState(false);

  const sessionCode = localStorage.getItem("sessionCode");

  const handleRelationship =(e) => {
    setErrorMsg("");
    setRelationship(e.target.value);
  }

  const handleAddress = (e) => {
    setErrorMsg("");
    setAddress(e.target.value);
  }

  const handleGEmailAddress = (e) => {
    setErrorMsg("");
    setGEmailAmail(e.target.value);
  }

  const handleAmount = (e) => {
    setErrorMsg("")
    setAmount(e.target.value);
  }

  const handleTenure = (e) => {
    setErrorMsg("");
    setTenure(e.target.value);
  }

  const handlePurpose = (e) => {
    setErrorMsg("");
    setPurpose(e.target.value);
  }

  const handleRelManage = (e) => {
    setErrorMsg("");
    setRelManager(e.target.value);
  }

  const handleEmailAddress = (e) => {
    setErrorMsg("");
    setEmail(e.target.value)
  }

  const handleFullname = (e) => {
    setErrorMsg("");
    setFullName(e.target.value);
  }

  const handlePhoneNumber = (e) => {
    setErrorMsg("");
    setPhoneNumber(e.target.value);
  }

  const handleBusinessAddress = (e) => {
    setErrorMsg("");
    setBusinessAddress(e.target.value);
  }

  const handleBusinessName = (e) => {
    setErrorMsg("");
    setBusinessName(e.target.value);
  }

  const handleRegistrationNumber = (e) => {
    setErrorMsg("");
    setRegistrationNumber(e.target.value);
  }

  const handleBusinessType = (e) => {
    console.log(e.target.value, "the business type");
    setErrorMsg("");
    setBusinessType(e.target.value);
  }


  const toggleConfirmation = () => {
    setConfirm(false);
  }

  useEffect(() => {
    if (tenure > 0 && amount > 0) {
      setMonthlyRemittance(amount * 0.06 + (amount/tenure))
    }
  }, [ amount, tenure ]);


  useEffect(() => {
    if (userDetails) {
      const firstName = userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.firstName;
      const lastName = userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.lastName;
      const accountNumber = userDetails.bank && userDetails.bank.accountNumber;
      const accountType = userDetails.bank && userDetails.bank.accountType;
      const name = userDetails.bank && userDetails.bank.name;
      const accountName =  firstName + " " + lastName;

      setAccountName(accountName);
      setBankName(name);
      setAccountType(accountType);
      setAccountNumber(accountNumber)
    }
  }, [ userDetails ]);
                      
  useEffect(() => {
    if (loan && loan.error) {
      setErrorMsg(loan.error);
      if (!Array.isArray(loan.error)) setError(loan.error);
    }
  }, [ loan ]);

  useEffect(() => {
    if (loan.businessLoanSuccess) {
      setMessage("Your request has been sent successfully. We get back to you within the next 48 to 72 hours");
      setTimeout(() => { 
        setConfirm(false);
        setMessage("");
      }, 4000);
    }
  }, [ loan ]);
  
  const handleSubmit = () => {
    const data = {
      address,
      amount,
      tenure,
      purpose,
      relManager,
      relationship,
      companyName,
      userId: userId,
      gEmailAddress,
      email: emailAddress,
      phoneNumber,
      fullName,
      accountName, 
      accountNumber,
      amountToPay: parseInt(amount) + parseInt(monthlyRemitance),
      accountType,
      category: "business",
      businessType,
      registrationNumber,
      businessAddress,
      businessName,
      bankName,
      sessionCode,
    }

    dispatch(businessLoan(data));
  }

  const handleCancelReqeust = () => {
    setMonthlyRemittance(0);
    setAddress("");
    setAmount("");
    setTenure("");
    setPurpose("");
    setRelManager("");
    setRelationship("");
    setCompanyName("");
    setEmail("");
    setFullName("");
    setAccountNumber("");
    setAccountName("");
    setAccountType("");
    setBankName("");
    setConfirm(false);
    setBusinessAddress("");
    setBusinessName("");
    setRegistrationNumber("")
    setBusinessType("")
  }

  return (
    <Card className="salary-card-container">
      <CardBody>
        <h4><strong>Business Loan</strong></h4>
        <p>
          The product is targeted at registered business owners/individuals who has unregistered business. 
          The loan is to grant business owners funds for business expansion and access to working capital.
        </p>
        <p>
          It has a tenure of 30 to 90 days with an option of instant renewal of facility. The amount ranges N100, 000.00 to N5, 000, 000.00.
        </p>
        <Row className="mt-4 mb-3">
          <Col xs="10" xl="9" className="steps">
            <Steps current={count} size="small">
              <Step title={"Loan"} />
              <Step title="Business Information" />
              <Step title="Guarantor's Information" />
              <Step title="Account Information" />
            </Steps>
          </Col>
        </Row>
        {count === 0 ?
          <LoanComponent
            amount={amount}
            tenure={tenure}
            purpose={purpose}
            relManager={relManager}
            handleAmount={handleAmount}
            handlePurpose={handlePurpose}
            handleRelManage={handleRelManage}
            handleTenure={handleTenure}
            errorMsg={errorMsg}
          /> : count === 1 ? 
          <BusinessInformation
            businessType={businessType}
            handleBusinessType={handleBusinessType}
            handleBusinessName={handleBusinessName}
            businessName={businessName}
            handleRegistrationNumber={handleRegistrationNumber}
            registrationNumber={registrationNumber}
            emailAddress={emailAddress}
            handleEmailAddress={handleEmailAddress}
            businessAddress={businessAddress}
            handleBusinessAddress={handleBusinessAddress}
            errorMsg={errorMsg}
          /> : count === 2 ? 
          <GuarantorInformation
            fullName={fullName}
            emailAddress={gEmailAddress}
            handlePhoneNumber={handlePhoneNumber}
            handleFullname={handleFullname}
            handleRelationship={handleRelationship}
            relationship={relationship}
            handleEmailAddress={handleGEmailAddress}
            phoneNumber={phoneNumber}
            address={address}
            handleAddress={handleAddress}
            errorMsg={errorMsg}
          /> : 
          <AccountInformation userDetails={userDetails} />
        }
       
        <Row className="mt-5">
          <Col xs="12" xl="8" className="">
          </Col>
          <Col xs="12" xl="4" className="">
            <Row>
              <Col xs="6" xl="6" className="pt-3">
                {count > 0 ? (
                  <span className="prev-button" onClick={() => setCount(count - 1)}>Previous</span>
                ) : null}
              </Col>
              <Col xs="6" xl="6">
                {count === 3 ? <Button id="next-button" onClick={() => setConfirm(true)}>Continue</Button> : <Button id="next-button" onClick={() => setCount(count + 1)}>Next</Button>}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs="12" xl="12">
            <Modal toggle={toggleConfirmation} isOpen={confirmation}>
              <ModalBody>
                <Row>
                  <Col xs="12" xl="12">
                    {message.length > 0 ? <Alert color="success">{message}</Alert> : null}
                    {error.length > 0 ? <Alert color="danger">{error}</Alert> : null}
                  </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                  <Col xs="12" xl="12">
                    <Row className="justify-content-center">
                      <Col xs="12" xl="11">
                        <p className="text-center">You pay</p>
                        <h3 className="text-center"><strong>&#8358;{monthlyRemitance.toFixed(2)}</strong></h3>
                        <p className="text-center">For 6 months</p>
                        <p>Click Submit Application to Submit Loan Request or click Cancel to Discard this Loan request.</p>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col xs="12" xl="11">
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "relManager" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "companyName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "relationship" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "payday" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "fullName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "amount" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phoneNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "address" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "businessName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "businessEmail" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "businessType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "tenure" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "registrationNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "purpose" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                      </Col>
                    </Row>
                    
                    <Row className="mt-5 ml-4 mb-5">
                      <Col xs="6" xl="6">
                        <Button className="loan-cancel-button" onClick={handleCancelReqeust}>Cancel application</Button>
                      </Col>
                      <Col xs="6" xl="6">
                        {loan.businessLoanLoading ? 
                        <div className="text-center">
                          <Spinner color="primary" />
                        </div> : (<Button className="loan-submit-button" onClick={handleSubmit}>Submit application</Button>)}
                        
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default BusinessLoan;
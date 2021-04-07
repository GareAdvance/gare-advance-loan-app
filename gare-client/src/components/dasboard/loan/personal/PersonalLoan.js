import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Modal, ModalBody, Spinner, Alert } from "reactstrap";
import { Button, Steps } from "antd";
import "./Personal.css";
import LoanComponent from "./LoanComponent";
import WorkInformation from "./WorkInformation";
import GuarantorInformation from "./GuarantorInformation";
import AccountInformation from "./AccountInformation";
import { uploader } from "../../../../store/actions/action_file_upload";
import { postLoan } from "../../../../store/actions/actions_loan";
import { localStorageAuth } from "../../../../helper/authenticate"

const { Step } = Steps;

const PersonalLoan = ({ userDetails }) => {
  const loan = useSelector(state => state.loan);
  const upload = useSelector(state => state.upload);
  const dispatch = useDispatch();
  const [ count, setCount ] = useState(0);
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ amount, setAmount ] = useState(0);
  const [ tenure, setTenure ] = useState(0);
  const [ purpose, setPurpose ] = useState("");
  const [ relManager, setRelManager ] = useState("");
  const [ fullName, setFullName ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ companyName, setCompanyName ] = useState("");
  const [ salary, setSalary ] = useState(0);
  const [ workID, setWorkID ] = useState("");
  const [ payday, setPayday ] = useState(0);
  const [ address, setAddress ] = useState("");
  const [ confirmation, setConfirm ] = useState(false);
  const [ bankName, setBankName ] = useState("");
  const [ accountName, setAccountName ] = useState("");
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ accountType, setAccountType ] = useState("");
  const [ photo, setPhoto ] = useState({});
  const [ relationship, setRelationship ] = useState("");
  const [ monthlyRemitance, setMonthlyRemittance ] = useState(0);
  const [ isAttested, setIsAttested] = useState(null);
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const attestation = useRef(null);

  const sessionCode = localStorage.getItem("sessionCode");

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

  const handleEmail = (e) => {
    setErrorMsg("");
    setEmail(e.target.value)
  }

  const handleFullname = (e) => {
    setErrorMsg("");
    setFullName(e.target.value);
  }

  const handleRelationship = (e) => {
    setErrorMsg("");
    setError("");
    setRelationship(e.target.value);
  }

  const handlePhoneNumber = (e) => {
    setErrorMsg("");
    setPhoneNumber(e.target.value);
  }

  const handlePayDay = (e) => {
    setErrorMsg("");
    setPayday(e.target.value);
  }

  const handleSalary = (e) => {
    setErrorMsg("");
    setSalary(e.target.value);
  }

  const handleCompanyName = (e) => {
    setErrorMsg("");
    setCompanyName(e.target.value);
  }

  const handleAddress = (e) => {
    setError("");
    setErrorMsg("");
    setAddress(e.target.value);
  }

  useEffect(() => {
    if (tenure > 0 && amount > 0) {
      setMonthlyRemittance(amount * 0.06 + (amount/tenure))
    }
  }, [ amount, tenure ]);

  useEffect(() => {
    if (upload && upload.success) {
      setWorkID(upload.idCard && upload.idCard.secure_url);
    }
  }, [ upload ]);

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
  
  const formData = new FormData();

  formData.append('file', photo);
  // replace this with your upload preset name
  formData.append('upload_preset', "gare-upload-preset");

  const options = {
    method: 'POST',
    body: formData,
  };

  const handlePhoto = (e) => {
    setErrorMsg("");
    setErrorMsg("")
    setPhoto(e.target.files[0]);
  }

  useEffect(() => {
    if (photo && photo.name) {
      dispatch(uploader(options));
    }
  }, [ photo, dispatch ]);

                        
  useEffect(() => {
    if (loan && loan.success) {
      setMessage("Your request has been sent successfully. We get back to you within the next 48 to 72 hours");
      setTimeout(() => { 
        setMessage("");
        setConfirm(false);
        // window.location.href = "/account";
      }, 4000);
      
    }
  }, [ loan ]);

  useEffect(() => {
    if (loan && loan.error) {
      setErrorMsg(loan.error);
      if (!Array.isArray(loan.error)) setError(loan.error);
    }
  }, [ loan ]);

  const handleSubmit = () => {
    const data = {
      address,
      amount: parseInt(amount),
      tenure: parseInt(tenure),
      purpose,
      relManager,
      relationship,
      salary: parseInt(salary),
      payday,
      companyName,
      workID,
      userId: userId,
      amountToPay: parseInt(amount) + parseInt(monthlyRemitance),
      email,
      phoneNumber,
      fullName,
      accountName, 
      accountNumber,
      accountType,
      category: "personal",
      bankName,
      sessionCode,
    }

    dispatch(postLoan(data));
  }

  const toggleConfirmation = () => {
    setConfirm(false);
  }

  const handleCancelReqeust = () => {
    setMonthlyRemittance(0);
    setAddress("");
    setAmount("");
    setTenure("");
    setPurpose("");
    setRelManager("");
    setRelationship("");
    setSalary("");
    setPayday("");
    setCompanyName("");
    setWorkID("");
    setEmail("");
    setFullName("");
    setAccountNumber("");
    setAccountName("");
    setAccountType("");
    setBankName("");
    setConfirm(false);
  }

  const handleAttestation = () => {
    setIsAttested(attestation.current && attestation.current.checked);
  }
  
  return (
    <Card className="salary-card-container">
      <CardBody>
        <h4><strong>Personal Loan</strong></h4>
        <p>
          This loan is set for salary earners who works with structured organizations. 
          It has a tenure of 30 to 180 days with the amount ranging from N100, 000.00 to N5, 000, 000. 00.
        </p>
        <Row className="mt-4 mb-3">
          <Col xs="10" xl="9" className="steps">
            <Steps current={count} size="small">
              <Step title={"Loan"} />
              <Step title="Work Information" />
              <Step title="Guarantor Information" />
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
            message={message}
            error={error}
          /> : count === 1 ? 
          <WorkInformation
            salary={salary}
            payday={payday}
            companyName={companyName}
            handlePayDay={handlePayDay}
            handleSalary={handleSalary}
            handleCompanyName={handleCompanyName}
            handlePhoto={handlePhoto}
            workID={workID}
            message={message}
            upload={upload}
            error={error}
            errorMsg={errorMsg}
          /> : count === 2 ? 
          <GuarantorInformation
            email={email}
            phoneNumber={phoneNumber}
            fullName={fullName}
            address={address}
            handleAddress={handleAddress}
            handleEmailAddress={handleEmail}
            handlePhoneNumber={handlePhoneNumber}
            handleFullname={handleFullname}
            handleRelationship={handleRelationship}
            errorMsg={errorMsg}
            message={message}
            error={error}
          /> : 
          <AccountInformation 
            handleAttestation={handleAttestation} 
            userDetails={userDetails} 
            attestation={attestation}
            isAttested={isAttested}
          />
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
                {count === 3 ? 
                <Button disabled={count === 3 && isAttested === null ? true : count === 3 && isAttested === false ? true : false} id="next-button" onClick={() => setConfirm(true)}>Continue</Button> : 
                <Button id="next-button" onClick={() => setCount(count + 1)}>Next</Button>}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs="12" xl="12">
            <Modal toggle={toggleConfirmation} isOpen={confirmation}>
              <ModalBody>
                <Row className="justify-content-center">
                  <Col xs="12" xl="12">
                    {message.length > 0 ? <Alert color="success">{message}</Alert> : null}
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs="12" xl="12">
                    {error.length > 0 ? <Alert color="danger">{error}</Alert> : null}
                  </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                  <Col xs="12" xl="12">
                    <Row className="justify-content-center">
                      <Col xs="12" xl="11">
                        <p className="mt-2 text-center">You pay</p>
                        <h3 className="text-center remittance"><strong>&#8358;{monthlyRemitance}</strong></h3>
                        <p className="text-center tenure-text">For {tenure} months</p>
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
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "salary" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "payday" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "tenure" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "wordID" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "purpose" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                      </Col>
                    </Row>
                    
                    <Row className="mt-5 ml-4 mb-5">
                      <Col xs="6" xl="6">
                        <Button className="loan-cancel-button" onClick={handleCancelReqeust}>Cancel application</Button>
                      </Col>
                      <Col xs="6" xl="6">
                        {loan.loading ?
                          <Spinner /> : 
                          (<Button className="loan-submit-button" onClick={handleSubmit}>Submit application</Button>)
                        }
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

export default PersonalLoan;
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Col, Row, Modal, ModalBody, Spinner, Alert, ModalHeader } from "reactstrap";
import { Button, Steps } from "antd";
import "./Salary.css";
import LoanComponent from "./LoanComponent";
import WorkInformation from "./WorkInformation";
import HRInformation from "./HRInformation";
import AccountInformation from "./AccountInformation";
import { uploader } from "../../../../store/actions/action_file_upload";
import { localStorageAuth } from "../../../../helper/authenticate";
import { salaryLoan } from "../../../../store/actions/actions_loan";

const { Step } = Steps;

const SalaryLoan = ({ userDetails }) => {
  const dispatch = useDispatch();
  const loan = useSelector(state => state.loan);
  const upload = useSelector(state => state.upload);
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
  const [ confirmation, setConfirm ] = useState(false);
  const [ uploadedID, setUploadedId ] = useState("");
  const [ accountName, setAccountName ] = useState("");
  const [ accountType, setAccountType ] = useState("");
  const [ bankName, setBankName ] = useState("");
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ monthlyRemitance, setMonthlyRemittance ] = useState(0);
  const [ acct_attestation, setAccountAttestation ] = useState(null);
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const [ isAttested, setIsAttested] = useState(null);
  const attestation = useRef(null);
  const acctAttestation = useRef(null);
  const sessionCode = localStorage.getItem("sessionCode");
  
  useEffect(() => {
    const formData = new FormData();
    formData.append("file", workID);
    formData.append('upload_preset', "gare-upload-preset");
    const config = { method: "POST", body: formData }
    if (workID && workID.name) {
      dispatch(uploader(config));
    }
  }, [ workID, dispatch ]);

  useEffect(() => {
    if (loan && loan.error) {
      setErrorMsg(loan.error);
      if (!Array.isArray(loan.error)) setError(loan.error);
    }
  }, [ loan ]);

  useEffect(() => {
    if (loan.post_salary_success) {
      setMessage("Your request has been received. We get back to you within the next 48 to 72 hours");
      setTimeout(() => { 
        setConfirm(false);
        setMessage("");
      }, 4000)
    }
  }, [ loan ]);

  // Interest calculation
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
      const company = userDetails.employmentId && userDetails.employmentId.company_name;

      setAccountName(accountName);
      setBankName(name);
      setAccountType(accountType);
      setAccountNumber(accountNumber);
      setCompanyName(company);
    }
  }, [ userDetails ]);

  useEffect(() => {
    if (upload.success) {
      setUploadedId(upload.idCard && upload.idCard.secure_url);
    }
  }, [ upload ]);

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

  const handleWorkId = (e) => {
    setErrorMsg("");
    setWorkID(e.target.files[0]);
  }

  const toggleConfirmation = () => {
    setConfirm(false);
  }

  const handleSubmit = () => {
    setErrorMsg("");
    setError("");
    const data = {
      workId: uploadedID,
      amount, 
      tenure, 
      purpose, 
      relManager,
      email,
      phone: phoneNumber,
      companyName,
      salary,
      payday,
      amountToPay: parseInt(amount) + (parseInt(monthlyRemitance) * parseInt(tenure)),
      fullName,
      accountName,
      accountNumber,
      accountType,
      bankName,
      userId,
      category: "salary",
      sessionCode,
    }

    dispatch(salaryLoan(data));
    setErrorMsg("");
    setError("");
  }

  const handleCancelReqeust = () => {
    setErrorMsg("");
    setError("");
    setAmount("");
    setSalary("");
    setPayday("");
    setAccountName("");
    setAccountNumber("");
    setBankName("");
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAccountType("");
    setPurpose("");
    setRelManager("");
    setUploadedId("");
    setCompanyName("");
    setTenure("");
    setConfirm(false);
  }

  const handleAttestation = () => {
    setIsAttested(attestation.current && attestation.current.checked);
  }

  const onAttestation = () => {
    setAccountAttestation(acctAttestation.current && acctAttestation.current.checked);
  }
  
  return (
    <Card className="salary-card-container">
      <CardBody>
        <h4><strong>Salary Advance Loan</strong></h4>
        <p>
          This loan is set for salary earners working in a structured organization. 
          It has a tenure of 30 days or less with a maximum of 50% of net income. 
          The customer is expected to provide a salary indemnity form from the Human 
          resource of his or her organization as regards the advance. This will act as security for the facility.
        </p>
        <Row className="mt-4 mb-3">
          <Col xs="10" xl="9" className="steps">
            <Steps current={count} size="small">
              <Step title={"Loan"} />
              <Step title="Work Information" />
              <Step title="HR Information" />
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
          <WorkInformation
            salary={salary}
            payday={payday}
            companyName={companyName}
            handlePayDay={handlePayDay}
            handleSalary={handleSalary}
            handleCompanyName={handleCompanyName}
            handleWorkId={handleWorkId}
            workID={workID}
            uploadedID={uploadedID}
            upload={upload}
            errorMsg={errorMsg}
          /> : count === 2 ? 
          <HRInformation
            email={email}
            phoneNumber={phoneNumber}
            fullName={fullName}
            handleEmail={handleEmail}
            handlePhoneNumber={handlePhoneNumber}
            handleFullname={handleFullname}
            errorMsg={errorMsg}
            attestation={attestation}
            isAttested={isAttested}
            handleAttestation={handleAttestation}
          /> : 
          <AccountInformation 
            userDetails={userDetails}
            acctAttestation={acctAttestation}
            onAttestation={onAttestation}
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
                <Button disabled={
                  count === 3 && acct_attestation === null ? true : count === 3 && acct_attestation === false ? true : false} id="next-button" onClick={() => setConfirm(true)}>
                  Continue
                </Button> : 
                <Button disabled={count === 2 && isAttested === null ? true : count === 2 && isAttested === false ? true : false} id="next-button" onClick={() => setCount(count + 1)}>Next</Button>}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs="12" xl="12">
            <Modal toggle={toggleConfirmation} isOpen={confirmation}>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <Row className="justify-content-center">
                  <Col xs="12" xl="12">
                    {message.length > 0 ? <Alert color="success">{message}</Alert> : null}
                    {error.length > 0 ? <Alert color="danger">{error}</Alert> : null}
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col xs="12" xl="12">
                    <Row className="justify-content-center">
                      <Col xs="12" xl="11">
                        <p className="text-center">You pay</p>
                        <h3 className="text-center"><strong>&#8358;{monthlyRemitance}</strong></h3>
                        <p className="text-center">For {tenure} months</p>
                        <p>Click Submit Application to Submit Loan Request or click Cancel to Discard this Loan request.</p>
                      </Col>
                    </Row>
                    
                    <Row className="justify-content-center">
                      <Col xs="12" xl="11">
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "relManager" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "companyName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "payday" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "fullName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "amount" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phoneNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "salary" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "payday" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "tenure" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "workId" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                        {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "purpose" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                      </Col>
                    </Row>

                    <Row className="mt-5 ml-4">
                      <Col xs="6" xl="6">
                        <Button className="loan-cancel-button" onClick={handleCancelReqeust}>Cancel application</Button>
                      </Col>
                      <Col xs="6" xl="6">
                        {loan.post_salary_loading ? <Spinner color="primary" /> : <Button className="loan-submit-button" onClick={handleSubmit}>Submit application</Button>}
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

export default SalaryLoan;
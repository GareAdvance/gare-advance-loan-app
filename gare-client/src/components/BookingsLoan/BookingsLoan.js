import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Input, Alert } from "reactstrap";
import { Icon } from "semantic-ui-react";
import { Button } from "antd";
import querystring from "query-string";

import "./BookingsLoan.css";
import { postBookingLoan } from "../../store/actions/actions_loan";
import { creditLogin } from "../../store/actions/actions_onboarding";

const BookingsLoan = (props) => {
  const loans = useSelector(state => state.loan);
  const dispatch = useDispatch();
  const [ monthlyRemitance, setMonthlyRemittance ] = useState(0);
  const [values, setValues ] = useState({ 
    amount: "", 
    jobStartDate: "", 
    jobEndDate: "", 
    purpose: "", 
    tenure: "",
    fullName: "",
    email: "",
    workId: "",
    bvn: "",
    phone: "",
    dateOfBirth: "",
    businessAddress: "",
    bookingStatus: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    address: "",
  });

  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ isAttested, setIsAttested ] = useState(false);
  const attestation = useRef(null);
  const sessionCode = localStorage.getItem("sessionCode");
  const params = querystring.parse(props.location.search, { ignoreQueryPrefix: true });
  const { 
    amount, 
    jobEndDate, 
    jobStartDate, 
    tenure, 
    fullName,
    email,
    workId,
    bvn,
    phone,
    dateOfBirth,
    businessAddress,
    bookingStatus,
    purpose,
    bankName,
    accountName,
    accountNumber,
    businessName,
    businessEmail,
    registrationNumber,
    address,
  } = values;

  useEffect(() => {
    if (loans.error) {
      setErrorMsg(loans.error && loans.error);
      if (!Array.isArray(loans.error)) setError(loans.error && loans.error);
    }
  }, [ loans ]);

  useEffect(() => {
    dispatch(creditLogin());
  }, [ dispatch ]);

  useEffect(() => {
    if (tenure > 0 && amount > 0) {
      setMonthlyRemittance(amount * 0.06 + (amount/tenure));
    }
  }, [ amount, tenure ]);

  useEffect(() => {
    if (loans.bookingsSuccess) {
      setError("");
      setErrorMsg("")
      setMessage("Your request was sent successfully");
    }
  }, [ loans ]);

  useEffect(() => {
    setValues({ 
      ...values, 
      bvn: params.bvn,
      phone: params.phone,
      dateOfBirth: params.dateOfBirth,
      businessAddress: params.businessAddress,
      bookingStatus: params.bookingStatus,
      // workId: params.identityCard,
      jobEndDate: params.jobEndDate,
      jobStartDate: params.jobStartDate,
      fullName: params.fullName,
      email: params.email,
      workId: params.idCard,
      bankName: params.bankName,
      accountName: params.accountName,
      accountNumber: params.accountNumber,
      businessName: params.businessName,
      businessEmail: params.businessEmail,
      registrationNumber: params.registrationNumber,
      address: params.address,
    })
  }, [ ]);

  const handleChange = (e) => {
    setError("");
    setErrorMsg("");
    setMessage("");
    const { name, value } = e.target;
    setValues({ 
      ...values, 
      [name]: value,
      fullName,
      email,
      workId,
      bvn,
      phone,
      dateOfBirth,
      businessAddress,
      bookingStatus,
      accountName,
      accountNumber,
      bankName,
      businessName,
      businessEmail,
      registrationNumber,
      address,
    });
  }

  const handleSubmit = () => {
    setError("");
    setErrorMsg("")
    const data = { 
      amount, 
      jobEndDate, 
      jobStartDate,
      tenure,
      bvn,
      phone,
      dateOfBirth,
      businessAddress,
      bookingStatus,
      workId,
      amountToPay: parseInt(amount) + parseInt(monthlyRemitance),
      fullName,
      businessName,
      businessEmail,
      registrationNumber,
      accountName,
      accountNumber,
      bankName,
      email,
      sessionCode,
      address,
    }

    dispatch(postBookingLoan(data));
  }

  const handleAttestation = () => {
    setIsAttested(attestation.current && attestation.current.checked);
  }

  const handleCancel = () => {
    setValues({
      amount: "", 
      jobStartDate: "", 
      jobEndDate: "", 
      purpose: "", 
      tenure: "",
      fullName: "",
      email: "",
      workId: "",
      bvn: "",
      phone: "",
      dateOfBirth: "",
      businessAddress: "",
      bookingStatus: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      address: "",
    })
  }

  return (
    <div className="bookings-container">
      <Row className="justify-content-center">
        <Col xs="10" xl="3" className="form-wrapper1 pb-5">
          <Row>
            <Col xs="12">
              <h4 className="heading"><strong>Loan Request</strong></h4>
            </Col>
          </Row>

          {error.length > 0 ? 
          
              <Alert color="danger" style={{ color: "#ff0000" }}>{error}</Alert>
            : null}

          {message.length > 0 ? ( 
            <Alert className="text-center" style={{ color: "#0B70A5" }}>{message}</Alert> 
        ) : null}

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="amount">How much advance do you require? (NGN)</label>
              <Input name="amount" onChange={(e) => handleChange(e)} value={amount} id="amount" placeholder="20000" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "amount" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="6" xl="6">
              <label>Loan Tenure</label>
              <Input type="select" value={tenure} id="b-tenure" name="tenure" onChange={(e) => handleChange(e)}>
                <option>Select Loan Tenure</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "tenure" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="address">Purpose</label>
              <Input value={purpose} name="purpose" onChange={(e) => handleChange(e)} id="purpose" type="textarea" placeholder="Tell us what you want this loan for..." />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "purpose" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="1" xl="1">
              <input onChange={handleAttestation} ref={attestation} type="checkbox" style={{ marginTop: "-20px"}} />
            </Col>
            <Col xs="11" xl="11">
              <p className="attestatn">
                I authorize Gare Advance Financial Limited to make any enquiry it considers necessary 
                and appropriate for the purpose of evaluating this application.
              </p>
              {isAttested ? null : <p style={{ color: "#ff0000" }}><Icon color="red" size={"big"} name="exclamation triangle" />You must check the authorization box to be able to continue</p>}
            </Col>
          </Row>
            
          <Row className="mt-5 button-row">
            <Col xs="12" xl="6">
              <Button type="reset" onClick={handleCancel} className="booking-discard-button">Cancel</Button>
            </Col>
            <Col xs="12" xl="6">
              {loans && loans.bookingsLoading ? ( 
              <Button className="personal-info-button" loading primary>Loading</Button>): <Button disabled={isAttested ? false : true} onClick={handleSubmit} className="booking-loan-button">Send Request</Button>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BookingsLoan;
import React, { useState, useEffect } from "react";
import { useRavePayment } from "react-ravepayment";
import { Col, Input, Row } from "reactstrap";
import "./Payment.css";
 
const Payment = () => {
  const [ values, setValues ] = useState({ amount: "", phone: "", email: "" });
  const [ pubKey, setPubKey ] = useState("");
  const txnRef = Math.floor(100000 + Math.random() * 9022);

  const { amount, email, phone } = values;

  useEffect(() => {
    setPubKey(process.env.REACT_APP_FLW_PUB_KEY);
  }, []);
  
  const config = {
    txref: txnRef,
    customer_email: email,
    customer_phone: phone,
    amount: amount,
    PBFPubKey: pubKey && pubKey,
    production: false,
  };

  const { initializePayment } = useRavePayment(config);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <div className="payment-container">
      <Row className="justify-content-center data-container">
        <Col xs="10" xl="3" className="input-container">
          <Row>
            <Col xs="12" xl="12">
              <h3>Fund Gare Advance Account</h3>
              <p>Note that all data fields are required</p>
            </Col>
          </Row>
          <Input name="amount" value={amount} onChange={(e) => handleChange(e)} placeholder="Amount" />
          <Input value={email} name="email" type="email" onChange={(e) => handleChange(e)} placeholder="Customer email address" />
          <Input value={phone} name="phone" onChange={(e) => handleChange(e)} placeholder="Customer phone number" />
          <button  onClick={() => initializePayment()}>Pay 2000</button>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
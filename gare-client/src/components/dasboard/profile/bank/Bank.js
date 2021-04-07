import React, { useEffect, useState } from "react";
import "./Bank.css";
import { Col, Row, Input, Spinner, Alert } from "reactstrap";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getBanks } from "../../../../store/actions/account";

const Bank = (props) => {
  const [ banks, setBanks ] = useState([]);
  const banklist = useSelector(state => state.accountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanks());
  }, [ dispatch ]); 

  useEffect(() => {
    if (banklist && banklist.bankListSuccess) {
      setBanks(JSON.parse(banklist.banks))
    }
  }, [ banklist ]);

  const {
    accountNumber, 
    accountName, 
    accountType, 
    handleBankSubmit,
    handleBankClear,
    handleBankName,
    handleAccountType,
    handleAccountNumber,
    handleAccountName,
    errorMsg,
    message,
    error,
    account,
  } = props;
  
  return (
    <div className="personalinfo">
      <div>
        <h4 className="heading-3"><strong>Account Information</strong></h4>
        <p>Setup your account to receive loan</p>
      </div>
      {message.length ? (
        <Alert className="text-center" style={{ color: "#0B70A5" }}>{message}</Alert>
      ) : null}
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="fname">First Name</label>
          <Input onChange={(e) => handleBankName(e)} id="b-fname" type="select">
            <option>-Select a bank-</option>
            {banks.map((bank, i) => (<option key={i} value={bank.bankname}>{bank.bankname}</option>))}
          </Input>
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="aname">Account Name</label>
          <Input onChange={(e) => handleAccountName(e)} value={accountName} id="b-aname" type="text" placeholder="Account name" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="aNumber">Account Number</label>
          <Input onChange={(e) => handleAccountNumber(e)} value={accountNumber} id="b-aNumber" type="text" placeholder="Account number" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="atype">Account Type</label>
          <Input onChange={(e) => handleAccountType(e)} value={accountType} id="b-atype" type="text" placeholder="Account type" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      {error.length ? (
        <Row className="justify-content-center">
          <Col xs="7" xl="9">
            <p className="text-center" style={{ color: "#ff0000" }}>{error}</p>
          </Col>
        </Row>
      ) : null}
      
      <Row className="mt-5">
        <Col xs="12" xl="6">
          <Button onClick={handleBankClear} className="discard-button">Discard</Button>
        </Col>
        <Col xs="12" xl="6">
          {account.bankLoading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : <Button onClick={handleBankSubmit} className="personal-info-button">Save</Button>}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
        </Col>
      </Row>
    </div>
  );
}

export default Bank;
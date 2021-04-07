import React from "react";
import "./BVN.css";
import { Col, Row, Input, Alert, Spinner } from "reactstrap";
import { Button } from "antd";

const BVN = ({
  bvn, 
  phone, 
  dateOfBirth, 
  error, 
  errorMsg, 
  message, 
  handleBVN,
  handleDateOfBirth,
  handlePhone,
  handleBVNSubmit,
  handleBVNClear,
  account,
}) => {
  


  return (
    <div className="personalinfo">
      <div>
        <h4><strong>Bank Verification number</strong></h4>
        <p>Setup your account BVN</p>
      </div>
      
      {message.length ? (
        <Alert className="text-center success" style={{ color: "#0B70A5" }}>{message}</Alert>
      ) : null}

      <Row>
        <Col xs="12" xl="12">
          <label htmlFor="bvn">Enter your bank verification number</label>
          <Input id="b-bvn" value={bvn} onChange={(e) => handleBVN(e)} type="text" placeholder="Bank Verification Number" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "bvn" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="6">
          <label>Date of Birth</label>
          <Input id="b-date" value-={dateOfBirth} onChange={(e) => handleDateOfBirth(e)} type="date" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "dateOfBirth" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
        <Col xs="12" xl="6">
          <label htmlFor="phone">Phone Number</label>
          <Input id="b-phone" value={phone} onChange={(e) => handlePhone(e)} type="text" placeholder="Phone Number" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phone" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
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
          <Button onClick={handleBVNClear} className="discard-button">Discard</Button>
        </Col>
        <Col xs="12" xl="6">
          <Button onClick={handleBVNSubmit} className="personal-info-button">Save {account.bvnLoading ? <Spinner color="primary" style={{ float: "right"}} /> : null}</Button>
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

export default BVN;
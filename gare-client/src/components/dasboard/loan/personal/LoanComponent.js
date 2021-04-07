import React from "react";
import { Col, Row, Input } from "reactstrap";
// import { Button } from "antd";
import { InfoOutlined } from "@ant-design/icons";

import "./Personal.css";

const LoanComponent = ({
  amount,
  purpose,
  handleAmount,
  handlePurpose,
  handleRelManage,
  handleTenure,
  errorMsg,
}) => {
  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-4">
            <Col>
              <label htmlFor="p-amount">How much advance do you need [NGN]</label>
              <Input value={amount} id="p-amount" onChange={(e) => handleAmount(e)} className="form-control" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "amount" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="p-tenure">Loan Tenure</label>
              <Input onChange={(e) => handleTenure(e)} type="select" id="p-tenure" className="form-control">
                <option>Select Loan Tenure</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Input>
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "tenure" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="p-purpose">Purpose</label>
              <Input value={purpose} onChange={(e) => handlePurpose(e)} id="p-purpose" type="text" className="form-control" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "purpose" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="p-relm">Relationship Manager</label>
              <Input onChange={(e) => handleRelManage(e)} id="p-relm" type="select" id="rel" className="form-control">
                <option>Choose a Relationship Manager</option>
                <option value="Joy Onosetele">Joy Onosetele-Victoria Island, Lagos</option>
                <option value="esther">Esther</option>
                <option value="samuel">Samuel</option>
                <option value="isaiah">Isaiah</option>
              </Input>
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "relManager" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="6" className="pt-5">
          <Row>
            <Col xs="1" xl="1">
              <span id="info-outlined"><InfoOutlined /></span>
            </Col>
            <Col xs="11" xl="11">
              <p>
                The loan provides access to quick money to meet urgent financial needs and reduces reduces financial burden and pressure
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default LoanComponent;
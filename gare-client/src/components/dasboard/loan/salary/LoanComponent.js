import React from "react";
import { Col, Row, Input } from "reactstrap";
// import { Button } from "antd";
import { InfoOutlined } from "@ant-design/icons";

import "./Salary.css";

const LoanComponent = ({
  amount,
  purpose,
  handleAmount,
  handlePurpose,
  handleRelManage,
  handleTenure,
}) => {
  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-4">
            <Col>
              <label htmlFor="amount">How much advance do you need [NGN]</label>
              <Input value={amount} id="s-amount" onChange={(e) => handleAmount(e)} className="form-control" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="tenure">Loan Tenure</label>
              <Input onChange={(e) => handleTenure(e)} type="select" id="s-tenure" className="form-control">
                <option>Select Loan Tenure</option>
                <option value="1">1</option>
              </Input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="purpose">Purpose</label>
              <Input value={purpose} onChange={(e) => handlePurpose(e)} id="s-purpose" type="text" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label htmlFor="amount">How much advance do you need [NGN]</label>
              <Input onChange={(e) => handleRelManage(e)} type="select" id="s-relm" className="form-control">
                <option>-Select- Relationship Manager</option>
                <option value="Joy Onosetele">Joy Onosetele-Victoria Island, Lagos</option>
                <option value="esther">Esther</option>
                <option value="samuel">Samuel</option>
                <option value="isaiah">Isaiah</option>
              </Input>
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="6" className="pt-5">
          <Row>
            <Col xs="1" xl="1">
              <span id="info-outlined"><InfoOutlined /></span>
            </Col>
            <Col xs="11" xl="11">
              <p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog 6% with interest rate on principal.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default LoanComponent;
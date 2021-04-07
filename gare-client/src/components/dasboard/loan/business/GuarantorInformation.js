import React from "react";
import { Col, Row, Input } from "reactstrap";
// import { Button } from "antd";
import "./Business.css";

const GuarantorInformation = ({
  fullName,
  emailAddress,
  handlePhoneNumber,
  handleFullname,
  handleRelationship,
  relationship,
  handleEmailAddress,
  phoneNumber,
  address,
  handleAddress,
  errorMsg,
}) => {
  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-2">
            <Col xs="12" xl="12">
              <label htmlFor="amount">Full Name</label>
              <Input value={fullName} onChange={(e) => handleFullname(e)} placeholder="Full name" className="form-control" />
            </Col>
           
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="6">
              <label htmlFor="salary">Relationship</label>
              <Input 
                onChange={(e) => handleRelationship(e)} 
                id="salary" value={relationship} 
                type="select"
              >
                <option>Guarantor relationship</option>
                <option value="brother">Brother</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="sister">Sister</option>
                <option value="uncle">Uncle</option>
                <option value="wife">Wife</option>
              </Input>
            </Col>
            <Col xs="12" xl="6">
              <label htmlFor="payday">Phone Number</label>
              <Input type="tel" onChange={(e) => handlePhoneNumber(e)} value={phoneNumber} id="payday" placeholder="Phone number" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="email">Email Address</label>
              <Input value={emailAddress} onChange={(e) => handleEmailAddress(e)} value={emailAddress} id="email" placeholder="Email address" className="form-control" />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="address">Address</label>
              <Input 
                onChange={(e) => handleAddress(e)} 
                value={address} id="address" 
                placeholder="319, Akin Ogunlewe Street, Off Ligali Ayorinde, VI, Lagos." 
                className="form-control" />
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="6">

        </Col>
      </Row>
    </div>
  );
}

export default GuarantorInformation;
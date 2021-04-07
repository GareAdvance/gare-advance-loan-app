import React from "react";
import { Col, Row, Input } from "reactstrap";

const BusinessInformation = ({
  businessType,
  handleBusinessType,
  handleBusinessName,
  businessName,
  handleRegistrationNumber,
  registrationNumber,
  emailAddress,
  handleEmailAddress,
  BusinessAddress,
  handleBusinessAddress,
}) => {

  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-2">
            <Col xs="12" xl="12">
              <label htmlFor="amount">Business Name</label>
              <Input value={businessName} onChange={(e) => handleBusinessName(e)} placeholder="Business Name" className="form-control" />
            </Col>
           
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="6">
              <label htmlFor="salary">Business Type</label>
              <Input 
                onChange={(e) => handleBusinessType(e)} 
                id="salary" 
                type="select"
              >
                <option>-Select business type-</option>
                <option value="sme">SME</option>
              </Input>
            </Col>
            <Col xs="12" xl="6">
              <label htmlFor="payday">Registration Number</label>
              <Input onChange={(e) => handleRegistrationNumber(e)} value={registrationNumber} id="payday" placeholder="Registration number" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="email">Email Address</label>
              <Input value={emailAddress} type="email" onChange={(e) => handleEmailAddress(e)} value={emailAddress} id="email" placeholder="Email address" className="form-control" />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="businessAddress">Business Address</label>
              <Input onChange={(e) => handleBusinessAddress(e)} value={BusinessAddress} id="businessAddress" placeholder="Business address" className="form-control" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BusinessInformation;
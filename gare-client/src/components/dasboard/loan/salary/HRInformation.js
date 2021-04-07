import React from "react";
import { Col, Row, Input } from "reactstrap";

const HRInformation = ({
  email,
  phoneNumber,
  fullName,
  handleEmail,
  handlePhoneNumber,
  handleFullname,
  attestation,
  handleAttestation,
}) => {
  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-2">
            <Col>
              <label htmlFor="name">Full Name</label>
              <Input value={fullName} onChange={(e) => handleFullname(e)} id="name" placeholder="Full Name" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <label htmlFor="phone">Phone Number</label>
              <Input onChange={(e) => handlePhoneNumber(e)} placeholder={"Phone Number"} value={phoneNumber} type="text" id="phone" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <label htmlFor="email">Official Email</label>
              <Input value={email} onChange={(e) => handleEmail(e)} id="email" placeholder="Official Email" type="email" className="form-control" />
            </Col>
          </Row>

          <p className="mt-3">Attestation</p>
          <Row>
            <Col xs="1" xl="1">
              {/* <span id="info-outlined">< CheckOutlined /></span> */}
              <input onChange={handleAttestation} ref={attestation} type="checkbox" style={{ marginTop: "-20px"}} />
            </Col>
            <Col xs="11" xl="11">
              <p>I agree that the above information about my company's Human Resource Manager is correct and accurate. I can be held liable if found otherwise.</p>
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="6">

        </Col>
      </Row>
    </div>
  );
}

export default HRInformation;
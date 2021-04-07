import React from "react";
import { Col, Row, Input } from "reactstrap";
// import { Button } from "antd";
import "./Personal.css";

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
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "fullName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}

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
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "relationship" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
            <Col xs="12" xl="6">
              <label htmlFor="payday">Phone Number</label>
              <Input onChange={(e) => handlePhoneNumber(e)} value={phoneNumber} id="payday" placeholder="+2348023114422" className="form-control" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phoneNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="email">Email Address</label>
              <Input value={emailAddress} onChange={(e) => handleEmailAddress(e)} value={emailAddress} id="email" placeholder="Email address" className="form-control" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label htmlFor="businessAddress">Business Address</label>
              <Input 
                onChange={(e) => handleAddress(e)} 
                value={address} id="businessAddress" 
                placeholder="319, Akin Ogunlewe Street, Off Ligali Ayorinde, VI, Lagos." 
                className="form-control" />
                {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "address" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
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
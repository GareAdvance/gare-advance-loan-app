import React from "react";
import { Col, Row, Input, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import "./Salary.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const AccountInformation = ({
  userDetails,
  onAttestation,
  acctAttestation,
}) => {
  const firstName = userDetails && userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.firstName;
  const lastName = userDetails && userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.lastName;
  const accountNumber = userDetails && userDetails.bank && userDetails.bank.accountNumber;
  const accountType = userDetails && userDetails.bank && userDetails.bank.accountType;
  const name = userDetails && userDetails.bank && userDetails.bank.name;

  console.log(acctAttestation, "the account attestation")
  return (
    <div>
      <Row className="mt-3">
        <Col xs="12" xl="5">
          <Card id="account-card">
            <CardBody>
              <Row className="mt-2">
                <Col xs="12" xl="12" className="pl-4">
                  <p className="account-type">
                    {accountType ? accountType : "No data"}
                  </p>
                  <p className="bank-name">{name ? name : "No data"}</p>
                  <p className="account-number">{accountNumber ? accountNumber : "No data"}</p>
                </Col>
              </Row>
              
              <Row className="mt-3">
                <Col xs="12" xl="12" className="pl-4">
                  <p className="account-type">Account Name</p>
                  <p className="account-number">
                    {firstName ? firstName : "No data"} {" "} {lastName ? lastName : "No data"}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="6" className="pt-5">
          {userDetails && userDetails.pendingLoan ? null : <Button onClick={() => window.location.href="/account/profile"} className="change-button">Change</Button>}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" xl="5"></Col>
      </Row>
      <p className="mt-2">Attestation</p>
      <Row>
        <Col xs="1" xl="1">
          <input onChange={onAttestation} ref={acctAttestation} type="checkbox" style={{ marginTop: "-20px"}} />
        </Col>
        <Col xs="11" xl="5">
          <p className="attestation">
            I certify that all the information provided by me above is true, correct and complete. 
          I authorize Gare Advance Financial Limited to make any enquiry it considers necessary and appropriate for 
          the purpose of evaluating this application.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default AccountInformation;
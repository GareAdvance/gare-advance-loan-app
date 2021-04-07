import React from "react";
import { Col, Row, Input, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import { Icon } from 'semantic-ui-react'
import "./Personal.css";

const AccountInformation = ({ userDetails, attestation, isAttested, errorMsg, handleAttestation }) => {

  const firstName = userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.firstName;
  const lastName = userDetails.bank && userDetails.bank.owner && userDetails.bank.owner.lastName;
  const accountNumber = userDetails.bank && userDetails.bank.accountNumber;
  const accountType = userDetails.bank && userDetails.bank.accountType;
  const name = userDetails.bank && userDetails.bank.name;

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
      {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
      {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "accountType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
      {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "bankName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}

      <Row className="mt-3">
        <Col xs="12" xl="5">
          {/* <p className="partial-description">
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. 
            Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, 
            bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs 
            jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex 
            bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. 
            How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, 
            Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five 
            quacking zephyrs jolt my wax bed. Flummoxed by job.
          </p> */}
        </Col>
      </Row>
      <p className="mt-2">Attestation</p>
      <Row>
        <Col xs="1" xl="1">
          <input onChange={handleAttestation} ref={attestation} type="checkbox" style={{ marginTop: "-20px"}} />
        </Col>
        <Col xs="11" xl="5">
          <p className="attestation">
            I certify that all the information provided by me above is true, correct and complete. 
            I authorize Gare Advance Financial Limited to make any enquiry it considers necessary 
            and appropriate for the purpose of evaluating this application.
          </p>
          {isAttested ? null : <p style={{ marginLeft: "-45px", color: "#ff0000" }}><Icon color="red" size={"big"} name="exclamation triangle" />You must accept the attestation to be able to continue</p>}
        </Col>
      </Row>
    </div>
  );
}

export default AccountInformation;
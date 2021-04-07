import React from "react";
import { Row, Col } from "reactstrap";
import { Button } from "antd";
import EmailSent from "../../assets/reset_password.svg";

const PasswordEmail = () => {
  

  return (
    <div className="signup-container">
      <Row className="justify-content-center">
        <Col xs="3" xl="3">
          <div className="account-container">
            <div className="text-center">
              <img className="mt-5" src={EmailSent} alt="email sent" />
              <h4 className="" style={{ marginTop: "70px"}}><strong>Email Sent</strong></h4>
              <p>A password reset link was sent to your email address. Check your email and continue</p>
              <Row className="mt-5">
                <Col xs="12" xl="12">
                  <Button onClick={() => window.location.href = "/login"} className="reg-button">Go back</Button>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12" xl="12">
                  <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PasswordEmail;
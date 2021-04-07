import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Button, ModalBody } from "reactstrap";
import { verifyEmail } from "../../store/actions/actions_onboarding";
import { localStorageAuth } from "../../helper/authenticate";
import PasswordReset from "../../assets/verified_email.svg";

const EmailVerified = () => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const [ modal, setModal ] = useState(false);
  const tok = window.location.pathname.slice(14);

  useEffect(() => {
    const data = { email_verification_token: tok }
    dispatch(verifyEmail(data))
  }, [ dispatch, tok ]);

  useEffect(() => {
    if (account.verifyEmailSuccess) {
      setModal(true);
    }
  }, [ account ]);

  useEffect(() => {
    if (modal === true && localStorageAuth().token) {
      setTimeout(() => {
        window.location.href = "/account";
      }, 2000)
    }
  }, [ modal ]);

  const toggle = () => {
    setModal(false);
  }

  return (
    <div>
      <div className="signup-container">
        <Row className="justify-content-center">
          <Col xl="3">
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <div className="text-center">
                  <img className="mt-5" src={PasswordReset} alt="email sent" />
                  <h4 className="" style={{ marginTop: "70px"}}><strong>You're set to go</strong></h4>
                  <p>Email verified successfully</p>
                  <Row className="mt-5">
                    {/* <Col xs="12" xl="12">
                      <Button onClick={() => window.location.href = "/login"} className="reg-button">Login</Button>
                    </Col> */}
                  </Row>
                  <Row className="mt-4">
                    <Col xs="12" xl="12">
                      <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
                    </Col>
                  </Row>
                </div>
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EmailVerified;
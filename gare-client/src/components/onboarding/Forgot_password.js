import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Input, Spinner, Modal, ModalBody } from "reactstrap";
import { Button } from "antd";
import Logo from "../../assets/logo1.svg";
import EmailSent from "../../assets/reset_password.svg";

import { forgotPassword } from "../../store/actions/actions_onboarding";

const ForgotPassword = () => {
  const [ email, setEmail ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const [ modal, setModal ] = useState(false);

  const handleEmail = (e) => {
    setErrorMsg("");
    setEmail(e.target.value);
  }


  const handleSubmit = () => {
    const data = { email };
    const userType = "user";
    dispatch(forgotPassword(data, userType));
  }

  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error)
    }
  }, [ account ]);

  useEffect(() => {
    if (account.forgotPasswordSuccess === true) {
      setModal(true);
    }
  }, [ account ]);

  const toggle = () => {
    setModal(false);
  }

  return (
    <div className="signup-container">
      <Row className="justify-content-center">
        <Col xl="3">
          {modal ? (
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
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
              </ModalBody>
            </Modal>
          ) : (
            <div className="login-container">
              <Row>
                <Col xs="12" xl="12">
                  <p className="float">New user? <Link to="/" className="r-text ">Sign up</Link></p>
                </Col>
              </Row>
              {/* the logo */}
              <Row className="justify-content-center">
                <Col xs="4" xl="2">
                  <img src={Logo} alt="logo" className="logo"/>
                </Col>
              </Row>

              <Row className="justify-content-center mt-5">
                <Col xs="7" xl="7">
                  <h4 className="text-center"><strong>Forgot Password?</strong></h4>
                  <p className="text-center">Reset your password</p>
                </Col>
              </Row>
              
              <Row className="mt-4">
                <Col xs="12" xl="12">
                  <label htmlFor="email">Email Address</label>
                  <Input onChange={(e) => handleEmail(e)} type="email" id="email" placeholder="example@mail.com" className="form-controller" />
                  {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xs="12" xl="12">
                  {account.forgotPasswordLoading === true ? (<div className="text-center"><Spinner color="primary" /></div>) : (<Button onClick={handleSubmit} className="reg-button">Submit</Button>)}
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs="8" xl="8">
                  <p><Link className="forgot-password" to="/login">Sign in</Link></p>
                </Col>
                <Col xs="4" xl="4">
                  <p><span className="privacy">Privacy | Terms</span></p>
                </Col>
              </Row>
            </div>
          )}
          
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPassword;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Input, Spinner, Modal, ModalBody } from "reactstrap";
import { Button } from "antd";
import Logo from "../../assets/logo1.svg";
import { resetPassword } from "../../store/actions/actions_onboarding";
import PasswordReset from "../../assets/password_changed.svg";

const ResetPassword = () => {
  const account = useSelector(state => state.account)
  const dispatch = useDispatch();
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ errMsg, setErrMsg ] = useState("")
  const [ modal, setModal ] = useState(false);
  const token = window.location.pathname.slice(16);

  const handleSubmit = () => {
    const data = { password, confirmPassword, token };
    if (password !== confirmPassword ) return setErrMsg("Passwords did not match")
    const userType = "user";
    dispatch(resetPassword(data, userType));
  }

  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error)
    }
  }, [ account ]);

  useEffect(() => {
    if (account.resetPasswordSuccess === true) {
      setModal(true);
    }
  }, [ account ]);

  const handleConfirmPassword = (e) => {
    setErrorMsg("");
    setConfirmPassword(e.target.value);
  }

  const handlePassword = (e) => {
    setErrorMsg("");
    setPassword(e.target.value);
  }

  const toggle = () => setModal(false)

  return (
    <div className="signup-container">
      <Row className="justify-content-center">
        <Col xl="3">
          {modal ? (
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <div className="text-center">
                  <img className="mt-5" src={PasswordReset} alt="email sent" />
                  <h4 className="" style={{ marginTop: "70px"}}><strong>You're set to go</strong></h4>
                  <p>Password reset successfully</p>
                  <Row className="mt-5">
                    <Col xs="12" xl="12">
                      <Button onClick={() => window.location.href = "/login"} className="reg-button">Login</Button>
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
              <Col xs="2" xl="2">
                <img src={Logo} alt="logo" className="logo"/>
              </Col>
            </Row>

            <Row className="justify-content-center mt-5">
              <Col xs="7" xl="7">
                <h4 className="text-center"><strong>Reset Password</strong></h4>
                <p className="text-center">Change your password</p>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col xs="12" xl="12">
                <label htmlFor="password">New Password</label>
                <Input value={password} onChange={(e) => handlePassword(e)} type="password" id="password" placeholder="************" className="form-controller" />
                
                {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "password" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs="12" xl="12">
                <label htmlFor="cpassword">Confirm Password</label>
                <Input value={confirmPassword} onChange={e => handleConfirmPassword(e)} type="password" id="cpassword" placeholder="************" className="form-controller" />
                {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "confirmPassword" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
                {errMsg.length ? <span style={{ color: "#ff0000", fontSize: "12px"}}>{errMsg}</span> : null}
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs="12" xl="12">
                {account.resetPasswordLoading === true ? (<div className="text-center">
                  <Spinner color="primary" />
                </div>) : (<Button onClick={handleSubmit} className="reg-button">Reset password</Button>)}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs="8" xl="8">
                <p><Link className="forgot-password" to="/login">Sign in</Link></p>
              </Col>
              <Col xs="4" xl="4">
                <p><Link to="/privacy" className="privacy">Privacy</Link> | <Link to="/terms" className="privacy">Terms</Link></p>
              </Col>
            </Row>
          </div>
          )}
          
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword;
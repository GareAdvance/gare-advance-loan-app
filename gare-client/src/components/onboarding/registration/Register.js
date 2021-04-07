import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Input, Spinner } from "reactstrap";
import { Button } from "antd";
import Logo from "../../../assets/logo1.svg";
import EmailSent from "../../../assets/email_sent.svg";
import Brandname from "../../../assets/brandname.svg";
import { signup } from "../../../store/actions/actions_onboarding";
import "./Register.css";

const Register = () => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const [ message, setMessage ] = useState("");
  const [ toggle, toggleScreen ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ how_you_hear_about_us, setHowYouHeard ] = useState("");

  const handleSubmit = () => {
    const data = {
      firstName,
      lastName,
      phoneNumber: phone,
      email,
      password,
      how_you_hear_about_us
    }

    dispatch(signup(data));
  }

  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error))  setError(account.error);
    } 
  }, [ account ]);

  useEffect(() => {
    
    if (account.signupSuccess === true) {
      toggleScreen(true);
    }
  }, [ account ]);

  const handleFirstName = (e) => {
    setErrorMsg("");
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setErrorMsg("");
    setLastName(e.target.value);
  }

  const handleEmail = (e) => {
    setErrorMsg("");
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setErrorMsg("");
    setPassword(e.target.value);
  }

  const handlePhone = (e) => {
    setErrorMsg("");
    setPhone(e.target.value);
  }

  return (
    <div className="signup-container">
      <Row className="justify-content-center">
        <Col xs="12" xl="3">
          <div className="account-container">
            {toggle === true ? (
              <>
                <img className="mt-5" className="email-image" src={EmailSent} alt="email sent" />
                <h4 className="text-center"><strong>Email Verification sent</strong></h4>
                <p className="text-center">Check your email to verify and continue</p>
                <Row className="mt-5">
                  <Col xs="12" xl="12">
                    <Button onClick={() => toggleScreen(false)} className="reg-button">Resend email</Button>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="form-wrapper">
                <Row>
                  <Col xs="9" xl="9">
                    <img src={Logo} alt="logo"/> <img src={Brandname} alt="brand" />
                  </Col>
                  <Col xs="3" xl="3">
                    <Link to="/login"className="r-text float">Sign in</Link>
                  </Col>
                </Row>
                
                <Row className="justify-content-center mt-1">
                  <Col xs="7" xl="7">
                    <h4 className="text-center hey-text"><strong>Hey there, Sign up</strong></h4>
                    <p className="text-center hey-p-text">Get funds with our platform</p>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" xl="6">
                    <label htmlFor="fname">First Name</label>
                    <Input onChange={(e) => handleFirstName(e)} type="text" id="fname" placeholder="First name" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "firstName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "9px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>
                  <Col xs="12" xl="6" className="second-input">
                    <label htmlFor="lname">Last Name</label>
                    <Input onChange={(e) => handleLastName(e)} type="text" id="lname" placeholder="Last name" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "lastName" ? <><span key={i} style={{ color: "#ff0000", fontSize: "9px"}}>{error.msg}</span> <br /></> : null): null}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="6">
                    <label htmlFor="email">Email Address</label>
                    <Input onChange={(e) => handleEmail(e)} type="email" id="email" placeholder="example@mail.com" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? <span key={i} style={{ color: "#ff0000", fontSize: "9px"}}>{error.msg}</span> : null): null}
                  </Col>
                  <Col xs="12" xl="6" className="second-input">
                    <label htmlFor="phone">Phone Number</label>
                    <Input onChange={(e) => handlePhone(e)} id="phone" placeholder="+234 7037786423" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phoneNumber" ? <span key={i} style={{ color: "#ff0000", fontSize: "9px"}}>{error.msg}</span> : null): null}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label htmlFor="password">Password</label>
                    <Input onChange={(e) => handlePassword(e)} type="password" id="password" placeholder="Password" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "password" ? <span key={i} style={{ color: "#ff0000", fontSize: "9px"}}>{error.msg}</span> : null): null}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label htmlFor="how">How you heard about us <span>(Optional)</span></label>
                    <Input id="how" onChange={(e) => setHowYouHeard(e.target.value)} type="select" placeholder="Password" className="form-controller">
                      <option>How you here about us</option>
                      <option value>A friend</option>
                      <option value>On social media</option>
                      <option value>Through webinar</option>
                    </Input>
                    
                  </Col>
                </Row>
                {error.length ? (
                  <Row className="justify-content-center mt-1">
                    <Col xs="7" xl="12">
                      <p className="text-center" style={{ color: "#ff0000"}}>{error}</p>
                    </Col>
                  </Row>
                ) : null}
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <p>By signing up, you agree to our <span className="terms">Terms of use</span> & <span className="terms">Privacy Policy</span></p>
                  </Col>
                </Row>
                
                <Row className="mt-2">
                  <Col xs="12" xl="12">
                    {account.signupLoading ? (
                      <div className="text-center">
                        <Spinner color="primary" />
                      </div>
                    ) : (
                      <Button onClick={handleSubmit} className="reg-button">Sign up</Button>
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Register;
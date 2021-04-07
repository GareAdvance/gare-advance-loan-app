import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Input, Spinner } from "reactstrap";
import { Button } from "antd";
import Logo from "../../../assets/logo1.svg";
import { signin } from "../../../store/actions/actions_onboarding";

import "./Login.css"

const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setErrorMsg("");
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setErrorMsg("");
    setPassword(e.target.value);
  }

  const handleSignin = () => {
    const data = { email, password };
    const userType = "user";
    dispatch(signin(data, userType));
  }

  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error)
      if (!Array.isArray(account.error)) setError(account.error);
    }
  }, [ account ]);

  useEffect(() => {
    if (account.signinSuccess === true) {
      window.location.href = "/account";
    }
  }, [ account ]);
  
  return (
    <div className="signup-container">
      <Row className="justify-content-center">
        <Col xl="3">
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
            
            <Row className="justify-content-center mt-1">
              <Col xs="7" xl="7">
                <h4 className="text-center l-hey"><strong>Hey there, Sign in</strong></h4>
                <p className="text-center">Welcome to Gare Finance</p>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col xs="12" xl="12">
                <label htmlFor="email">Email Address</label>
                <Input type="email" onChange={(e) => handleEmail(e)} id="email" placeholder="example@mail.com" className="form-controller" />
                {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs="12" xl="12">
                <label htmlFor="password">Password</label>
                <Input onChange={(e) => handlePassword(e)} type="password" id="password" placeholder="Password" className="form-controller" />
                {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "password" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
              </Col>
            </Row>
            {error.length ? (
              <Row className="justify-content-center">
                <Col xs="7" xl="9">
                  <p className="text-center" style={{ color: "#ff0000" }}>{error}</p>
                </Col>
              </Row>
            ) : null}

            <Row className="mt-5 button-container">
              <Col xs="12" xl="12">
                {account.signinLoading ? (<div className="text-center"><Spinner color="primary" /></div>) : (<Button onClick={handleSignin} className="reg-button">Sign in</Button>)}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs="8" xl="8">
                <p><Link className="forgot-password" to="/forgot_password">Forgot password?</Link></p>
              </Col>
              <Col xs="4" xl="4">
                <p><span className="privacy">Privacy | Terms</span></p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login;
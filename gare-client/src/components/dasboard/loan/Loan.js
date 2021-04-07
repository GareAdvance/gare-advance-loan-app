import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Modal, ModalBody, Input, ModalHeader, Alert } from "reactstrap";
import { Tooltip, Button, Slider, ConfigProvider } from "antd";
import { DollarCircleFilled } from "@ant-design/icons";

import "./Loan.css";
import PersonalLoan from "./personal/PersonalLoan";
import BusinessLoan from "./business/BusinessLoan";
import SalaryLoan from "./salary/SalaryLoan";
import { getUser } from "../../../store/actions/account";
import { localStorageAuth } from "../../../helper/authenticate";
import { creditLogin } from "../../../store/actions/actions_onboarding";

const Loan = () => {
  const account = useSelector(state => state.accountReducer);
  const cred = useSelector(state => state.account);
  const dispatch = useDispatch();
  const [ modal, setModal ] = useState(false);
  const [ inputValue, setInputValue ] = useState(0);
  const [ month, setMonth ] = useState(0);
  const [ isMobile, setIsMobile ] = useState(false);
  const [ monthlyRemittance, setMonthlyRemittance ] = useState(0);
  const [ isBusinessLoan, setIsBusinessLoan ] = useState(false);
  const [ isPersonalLoan, setIsPersonalLoan ] = useState(false);
  const [ isSalaryLoan, setIsSalaryLoan ] = useState(false);
  const [ userDetails, setUserDetails ] = useState({});
  const [ profileError, setProfileError ] = useState("");
  const userId = localStorageAuth().user && localStorageAuth().user._id;

  const toggle = () => {
    setModal(false);
  }

  useEffect(() => {
    const data = { userId };
    dispatch(getUser(data));
    dispatch(creditLogin());
  }, []);

  useEffect(() => {
    if (account.userSuccess) {
      setUserDetails(account.account);
    }
  }, [ account ]);

  useEffect(() => {
    if (month > 0 && inputValue > 0) {
      setMonthlyRemittance(inputValue * 0.06 + (inputValue/month));
    }
  }, [ month, inputValue ]);

  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (cred.creditSuccess) {
      handleCreditLogin();
    }
  }, [ cred ]);

  const handleCreditLogin = () => {
    setInterval(() => {
      dispatch(creditLogin());
    }, 5400000);
  }

  const toggleBusinessLoan = () => {
    const profilePercentage = parseInt(userDetails.profilePercentage && userDetails.profilePercentage);
    if (profilePercentage !== 100) {
      setProfileError("Your profile is incomplete. You'll be redirected to your profile page to complete your profile before continuing");
      setTimeout(() => {
        window.location.href = "/account/profile";
      }, 2500);
      
      return;
    }
    setIsBusinessLoan(true);
    setIsPersonalLoan(false);
    setIsSalaryLoan(false);
  }

  const toggleSalaryLoan = () => {
    const profilePercentage = parseInt(userDetails.profilePercentage && userDetails.profilePercentage);

    if (profilePercentage !== 100) {
      setProfileError("Your profile is incomplete. You'll be redirected to your profile page to complete your profile before continuing");
      setTimeout(() => {
        window.location.href = "/account/profile";
      }, 2500);
      
      return;
    }
    setIsBusinessLoan(false);
    setIsPersonalLoan(false);
    setIsSalaryLoan(true);
  }

  const togglePersonalLoan = () => {
    const profilePercentage = parseInt(userDetails.profilePercentage && userDetails.profilePercentage);

    if (profilePercentage !== 100) {
      setProfileError("Your profile is incomplete. You'll be redirected to your profile page to complete your profile before continuing");
      setTimeout(() => {
        window.location.href = "/account/profile";
      }, 5000);
      
      return;
    }
    setIsBusinessLoan(false);
    setIsPersonalLoan(true);
    setIsSalaryLoan(false);
  }

  const personalLoanText = 
  <div className="personalText" style={{ 
      overflow: "hidden", 
      padding: "20px",
      // width: isMobile ? "300px" : ""
    }}
  >
    <p style={{ fontSize: "41px", color: "#E87C23"}}>Personal Loan</p>
    <p style={{ marginTop: "-30px", fontSize: "16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim luctus purus, nec varius tortor porttitor a. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean tincidunt aliquet 
    sem, quis faucibus ex maximus ac. Nullam dignissim, dui et pellentesque fringilla, turpis nisi varius augue, at congue 
    purus mauris at massa. Phasellus consequat consequat erat. Maecenas lorem sem, feugiat nec lacinia id, molestie a augue. 
    Fusce scelerisque, quam eget venenatis posuere, enim purus rutrum libero, in fringilla libero dui vitae diam. Integer a 
    faucibus ligula, vitae finibus lacus. Mauris vitae quam non risus tristique mattis at vel elit. Maecenas volutpat placerat 
    tincidunt. Vivamus sit amet urna id arcu tincidunt viverra id eget neque. Proin facilisis interdum tortor, sagittis 
    maximus massa lobortis ut.</p>
    <Button 
      className="tool-tip-button"
      onClick={togglePersonalLoan}
    >Start</Button>
  </div>
  
  const salaryLoanText = 
  <div className="salaryText" style={{ 
    overflow: "hidden", 
    padding: "20px",
    // width: isMobile ? "300px" : ""
    }}
  >
    <p style={{ fontSize: "41px", color: "#8625CF"}}>Salary Advance Loan</p>
    <p style={{ marginTop: "-30px", fontSize: "16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim luctus purus, nec varius tortor porttitor a. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean tincidunt aliquet 
    sem, quis faucibus ex maximus ac. Nullam dignissim, dui et pellentesque fringilla, turpis nisi varius augue, at congue 
    purus mauris at massa. Phasellus consequat consequat erat. Maecenas lorem sem, feugiat nec lacinia id, molestie a augue. 
    Fusce scelerisque, quam eget venenatis posuere, enim purus rutrum libero, in fringilla libero dui vitae diam. Integer a 
    faucibus ligula, vitae finibus lacus. Mauris vitae quam non risus tristique mattis at vel elit. Maecenas volutpat placerat 
    tincidunt. Vivamus sit amet urna id arcu tincidunt viverra id eget neque. Proin facilisis interdum tortor, sagittis 
    maximus massa lobortis ut.</p>
    <Button 
      className="tool-tip-button"
      onClick={toggleSalaryLoan}
    >Start</Button>
  </div>
  
  const businessLoanText = 
  <div className="businessText" style={{ overflow: "hidden", padding: "20px"}}>
    <p style={{ fontSize: "41px", color: "#0B67DF"}}>Business Loan</p>
    <p style={{ marginTop: "-30px", fontSize: "16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim luctus purus, nec varius tortor porttitor a. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean tincidunt aliquet 
    sem, quis faucibus ex maximus ac. Nullam dignissim, dui et pellentesque fringilla, turpis nisi varius augue, at congue 
    purus mauris at massa. Phasellus consequat consequat erat. Maecenas lorem sem, feugiat nec lacinia id, molestie a augue. 
    Fusce scelerisque, quam eget venenatis posuere, enim purus rutrum libero, in fringilla libero dui vitae diam. Integer a 
    faucibus ligula, vitae finibus lacus. Mauris vitae quam non risus tristique mattis at vel elit. Maecenas volutpat placerat 
    tincidunt. Vivamus sit amet urna id arcu tincidunt viverra id eget neque. Proin facilisis interdum tortor, sagittis 
    maximus massa lobortis ut.</p>
    <Button 
      className="tool-tip-button"
      onClick={toggleBusinessLoan}
    >Start</Button>
  </div>
  
  return (
    <div>
      {profileError.length > 0 ? <Alert color="danger" className="p-4 mb-5">{profileError}</Alert> : null}
      {isPersonalLoan ? (<PersonalLoan userDetails={userDetails} />) : isBusinessLoan ? <BusinessLoan userDetails={userDetails} /> : isSalaryLoan ? <SalaryLoan userDetails={userDetails} /> : (
        <div>
          <Row>
          <Col xs="6" xl="2">
            <Tooltip style={{ width: isMobile ? "300px !important" : "500px !important", background: "#fff" }} placement="bottomLeft" title={personalLoanText}>
              <Card id="loan-card" onClick={togglePersonalLoan}>
                <CardBody className="text-center">
                    <DollarCircleFilled />
                  <p className="mt-3" style={{ fontSize: "16px" }}>Personal Loan</p>
                </CardBody>
              </Card>
            </Tooltip>
          </Col>
  
          <Col xs="6" xl="2">
            <Tooltip style={{ width: isMobile ? "300px !important" : "500px !important", background: "#fff" }} placement="bottom" title={salaryLoanText}>
              <Card id="salaryloan-card" onClick={toggleSalaryLoan}>
                <CardBody className="text-center">
                    <DollarCircleFilled />
                  <p className="mt-3" style={{ fontSize: "16px" }}>Salary Loan</p>
                </CardBody>
              </Card>
            </Tooltip>
          </Col>
  
          <Col xs="6" xl="2">
            <Tooltip style={{ width: isMobile ? "300px !important" : "500px !important", background: "#fff" }} placement="bottomRight" title={businessLoanText}>
              <Card id="businessloan-card" onClick={toggleBusinessLoan}>
                <CardBody className="text-center">
                    <DollarCircleFilled />
                  <p className="mt-3" style={{ fontSize: "16px" }}>Businerss Loan</p>
                </CardBody>
              </Card>
            </Tooltip>
          </Col>
  
          <Col xs="6" xl="2" className="calculator">
            <div>
              <Card style={{ 
                  background: "#191817", 
                  color: "#FFF", 
                  borderRadius: "23px", 
                  opacity: 1, 
                  height: "145px",
                  paddingTop: "15px",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "90%"
                }}
                onClick={(() => setModal(true))}
              >
                <CardBody>
                  <div className="text-center">
                    <DollarCircleFilled style={{ fontSize: "40px"}} />
                    <p className="mt-3" style={{ fontSize: "16px"}}>Loan Calculator</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
  
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={() => setModal(false)}></ModalHeader>
          <ModalBody>
            <Card style={{ background: "transparent" }}>
              <CardBody>
                <p className="text-center">You pay</p>
                <h2 className="text-center">&#8358; {typeof monthlyRemittance === "number" ? monthlyRemittance.toFixed(2) : 0}</h2>
                <p className="text-center" style={{ lineHeight: "2px"}}>For {month} month{month > 1 ? "s" : null}</p>
                <Row>
                  <Col xs="12" xl="12">
                    <ConfigProvider getPopupContainer={triggerNode => triggerNode.parentNode}>
                      
                      <div className="fixed">
                        <Slider
                          min={50000}
                          max={1000000}
                          onChange={(value) => setInputValue(value)}
                          value={typeof inputValue === 'number' ? inputValue : 0 }
                          tooltipVisible={false}
                        />
                      </div>
                    </ConfigProvider>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label>How much advance do you require?</label>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="form-control" />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label>How long will you like to pay for?</label>
                    <Input onChange={(e) => setMonth(e.target.value)} type="select" className="form-control">
                      <option>-Select loan tenure-</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Input>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </div>
      )}
    </div>
    
  );
}

export default Loan;
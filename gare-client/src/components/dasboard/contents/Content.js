import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Layout } from 'antd';
import Headers from "../header/Headers";
import SideBar from "../sidebar/Side";
import "./Content.css";
import TabSideBar from "./TabSideBar";
import Home from "../home/Home";
import Loan from "../loan/Loan";
import Savings from "../savings/Savings";
import Transaction from "../transaction/Transaction";
import Profile from "../profile/Profile";
import { localStorageAuth } from "../../../helper/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/actions/account";
import MenuContainer from "../hamburger-menu/MenuContainer";

const Account = (props) => {
  const account = useSelector(state => state.accountReducer);
  const dispatch = useDispatch();
  const [ user, setUser ] = useState({});
  const [ isMenuOpen, setMenuOpen ] = useState(false);
  const time = new Date().getHours();

  useEffect(() => {
    const userId = localStorageAuth().user && localStorageAuth().user._id;
    const data = { userId }
    dispatch(getUser(data));
  }, [ dispatch ]);

  useEffect(() => {
    if (account.userSuccess) {
      setUser(account.account);
    }
  }, [ account ]);

  let greeting;
  if (time >= 12 && time < 17) {
    greeting = "Good Afternoon";
  } else if (time >= 17 && time <= 23) {
    greeting = "Good evening";
  } else {
    greeting = "Good Morning";
  }

  const handleStateChange = (state) => {
    setMenuOpen(state.isMenuOpen);
  }

  const photo = account.account && account.account.photo;
  const userDetails = account.account && account.account;

  return (
    <Layout>
      <div className="web-header">
        <Headers photo={photo} userDetails={userDetails} handleStateChange={handleStateChange} />
      </div>
      <div className="mobile-header">
        <MenuContainer />
        </div>
      <Layout>
        <div className="sidebar-component">
          <SideBar />
        </div>
       
        <Row className="main-container">
          <Col xs="12" xl="9" className="content">
            {window.location.pathname === "/account/profile" ? null : (
              <Row className="mb-4">
                <Col xs="12" xl="12">
                  <h3><strong>{greeting}</strong>, {localStorageAuth().user && localStorageAuth().user.firstName}</h3>
                </Col>
              </Row>
            )}
            
            <Row>
              <Col xs="12" xl="12">
                <Switch>
                  <Route exact path={`${props.match.url}`} render={(props) => <Home {...props} />} />
                  <Route exact path={`${props.match.url}/loan`} render={(props) => <Loan {...props} />} />
                  <Route exact path={`${props.match.url}/savings`} render={(props) => <Savings {...props} />} />
                  <Route exact path={`${props.match.url}/transactions`} render={(props) => <Transaction {...props} />} />
                  <Route exact path={`${props.match.url}/profile`} render={(props) => <Profile {...props} />} />
                </Switch>
              </Col>
            </Row>
          </Col>
          <Col xs="12" xl="3" className="side-tab">
            <TabSideBar user={user} />
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
}

export default Account;
import React from "react";
import { Layout, Avatar } from 'antd';
import { AntDesignOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap"
import "./Header.css";
import Brandname from "../../../assets/brandname.svg";
import Logo from "../../../assets/logo1.svg";
import Auth from "../../../helper/LocalStorageAuth";

const { Header } = Layout;

const Headers = ({ photo, userDetails }) => {
  const firstName = userDetails && userDetails.firstName;
  const lastName = userDetails && userDetails.lastName;

  const onLogout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/";
  }

  return (
    <Header className="header">
      <Row>
        <Col xs="2" xl="10">
        <img src={Logo} alt="App Logo" /> <img src={Brandname} alt="Brand name" className="brand-name" />
        </Col>
        <Col xs="" xl="2">
          <div>
            <Avatar
              size={50}
              src={photo && photo}
              icon={<AntDesignOutlined />}
            />
            <span className="username">
              {firstName} {" "} {lastName}
              <br />
              <span onClick={onLogout} className="logout">
                <strong>Logout</strong>
              </span>
            </span>
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default Headers;
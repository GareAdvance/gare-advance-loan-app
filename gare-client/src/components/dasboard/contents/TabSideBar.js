import React from "react";
import { Button, Progress } from 'antd';
import { Card, CardBody, Col, Row } from "reactstrap";
import { StickyContainer } from 'react-sticky';
import { BellFilled } from "@ant-design/icons";

const TabSideBar = ({ user }) => {

  const handleNavigation = () => {
    window.location.href = "/account/profile";
  }

  return (
    <div>
      <StickyContainer style={{ height: "470px", overflowY: "hidden"}}>
        <h5 className="text-center">
          <BellFilled />
          Notification
        </h5>
        <Card className="card" style={{ height: "88px", background: "#fff", padding: "15px"}}>
          <CardBody>
            Notification 1
          </CardBody>
        </Card>
      </StickyContainer>
      {window.location.pathname === "/account/profile" ? null : (
        <Card id="profile-status">
          <CardBody>
            <Row>
              <Col xs="3" xl="3">
                <Progress type="circle" percent={user && user.profilePercentage ? user.profilePercentage : 0} width={70} />
              </Col>
              <Col xs="9" xl="9">
                <p>Profile Information</p>
                <p className="complete">{user && user.profilePercentage === 100 ? "Perfect profile." : "Complete your profile to unlock funds"}</p>
              </Col>
            </Row>
            {user && user.profilePercentage === 100 ? null : (
              <Row>
                <Col xs="12" xl="12">
                  <Button onClick={handleNavigation}>Complete My profile</Button>
                </Col>
              </Row>
            )}
            
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default TabSideBar;
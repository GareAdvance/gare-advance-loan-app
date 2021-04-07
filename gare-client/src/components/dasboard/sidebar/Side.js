import React from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import Auth from "../../../helper/LocalStorageAuth"
import { Layout, Menu } from 'antd';
import { AppstoreFilled, PieChartFilled, CreditCardFilled, DollarCircleFilled } from '@ant-design/icons';
import "./Sidebar.css"

// const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = () => {
  const handleLogout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/";
  }

  return (
    <Sider width={350}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0, background: "#f5f5f5" }}
      >
        <Menu.Item key="1" className="menu">
          <Link to="/account">
            <AppstoreFilled className="sidebar-icon" /> Dashboard 
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/account/loan">
            <PieChartFilled /> Loan
          </Link>
        </Menu.Item>
        
        <Menu.Item key="4">
          <Link to="/account/transactions">
            <CreditCardFilled /> Transaction
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/account/profile">
            <i className="ri-user-3-fill"></i> Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="6" onClick={handleLogout}>
        <i className="ri-logout-box-r-fill"></i> Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar;
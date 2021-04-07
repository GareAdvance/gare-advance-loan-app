import { CreditCardFilled, DollarCircleFilled } from "@ant-design/icons";
import { Tabs, Button } from "antd";
import { StickyContainer, Sticky } from "react-sticky"
import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessLoan, fetchPersonalLoan, fetchSalaryLoan, getLoans } from "../../../store/actions/actions_loan";
import { localStorageAuth } from "../../../helper/authenticate";
import Paginations from "../Pagination/Pagination";

const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

const Home = () => {
  const loans = useSelector(state => state.loan);
  const dispatch = useDispatch();
  const businessLoan = useSelector(state => state.loan.business);
  const personalLoan = useSelector(state => state.loan.personal);
  const salaryLoan = useSelector(state => state.loan.salary);
  const [ allLoans, setAllLoans ] = useState([]);
  const [ pendingLoan, setPendingLoan ] = useState({});
  const [ convertedAmount, setConvertedAmount ] = useState(0);
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const [ amountToPay, setAmountToPay ] = useState(0);
  const [ isMobile, setIsMobile ] = useState(false);
  const [ personalPager, setPersonalPager ] = useState({});
  const [ personalPageOfItems, setPersonalPageOfItems ] = useState([]);
  const [ businessPager, setBusinessPager ] = useState({});
  const [ businessPageOfItems, setBusinessPageOfItems ] = useState([]);
  const [ salaryPager, setSalaryPager ] = useState({});
  const [ salaryPageOfItems, setSalaryPageOfItems ] = useState([]);

  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      setIsMobile(true);
    }else{
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    const data1 = { category: "personal", page: 1 }
    const data2 = { category: "business", page: 1  };
    const data3 = { category: "salary", page: 1  };
    dispatch(getLoans());
    dispatch(fetchPersonalLoan(data1));
    dispatch(fetchBusinessLoan(data2));
    dispatch(fetchSalaryLoan(data3));
  }, [ dispatch ]);

  useEffect(() => {
    if (loans.success) {
      setAllLoans(loans.loans && loans.loans.pageOfItems);
    }
  }, [ loans ]);

  useEffect(() => {
    if (allLoans && allLoans.length > 0) {
      console.log(allLoans, " these are all the loans")
      const filterLoans = allLoans && allLoans.length > 0 && allLoans.filter(l => l.status === "pending" && l.userId && l.userId._id === userId);
      setPendingLoan(filterLoans[0]);
      
    }
  }, [ allLoans ]);

  useEffect(() => {
    setConvertedAmount(pendingLoan && pendingLoan.amount && pendingLoan.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setAmountToPay(pendingLoan && pendingLoan.amount && pendingLoan.amountToPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }, [ pendingLoan ]);

  useEffect(() => {
    if (loans && loans.personalSuccess) {
      setPersonalPageOfItems(personalLoan.pageOfItems && personalLoan.pageOfItems);
      setPersonalPager(personalLoan.pager && personalLoan.pager);
    }
  }, [ loans ]);

  useEffect(() => {
    if (loans && loans.getBusinessSuccess) {
      setBusinessPageOfItems(businessLoan.pageOfItems && businessLoan.pageOfItems);
      setBusinessPager(businessLoan.pager && businessLoan.pager);
    }
  }, [ loans ]);

  useEffect(() => {
    if (loans && loans.getSalarySuccess) {
      setSalaryPageOfItems(salaryLoan.pageOfItems && salaryLoan.pageOfItems);
      setSalaryPager(salaryLoan.pager && salaryLoan.pager);
    }
  }, [ loans ]);

  const handlePagination = (category, page) => {
    const data = { category, page };
    if (category === "personal") {
      dispatch(fetchPersonalLoan(data));
    } else if (category === "salary") {
      dispatch(fetchSalaryLoan(data));
    } else {
      dispatch(fetchBusinessLoan(data));
    }
  }

  const amount = pendingLoan && pendingLoan.amountToPay && parseInt(pendingLoan.amountToPay);
  const tenure = pendingLoan && pendingLoan.tenure && parseInt(pendingLoan && pendingLoan.tenure);
  const monthlyPayment = amount && tenure ? (amount/tenure).toFixed(2) : "0.00";
  // const customerLoan = allLoans && allLoans.filter(l => l.userId && l.userId._id === userId);

  return (
    <div>
      <Row>
        <Col xs="12" xl="4">
          <Card style={{ 
              background: "#0B70A5", 
              color: "#FFF", 
              borderRadius: "23px", 
              opacity: 1, 
              height: "145px",
              padding: "20px"
            }}
          >
            <CardBody>
              <p style={{ letterSpacing: "0px", color: "#fff", opacity: 0.7 }}>Your Advance</p>
              <h3 style={{ color: "#fff", lineHeight: ".5em"}}><strong>&#8358;{convertedAmount ? convertedAmount : "0.00"}</strong></h3>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" xl="4">
          <Card style={{ 
              background: "#E87C231A",
              color: "#FFF",
              borderRadius: "23px",
              opacity: 1,
              height: "145px",
              padding: "20px"
            }}
          >
            <CardBody>
              <p style={{ letterSpacing: "0px", color: "#000", opacity: 1 }}>Your Payback</p>
              <h3 style={{ color: "#E87C23", lineHeight: "0.5em"}}><strong>&#8358;{amountToPay ? amountToPay : "0.00"}</strong></h3>
              <Row>
                <Col xs="6" xl="6"></Col>
                <Col xs="6" xl="6">
                  <p style={{ color: "black", marginTop: "-15px"}}>Monthly Payment</p>
                  <p style={{ lineHeight: "0.0001px", marginTop: "-10px", color: "#E87C23" }}>&#8358;{monthlyPayment}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" xl="2" className="get-loan">
          <Button style={{
            display: isMobile ? "block" : "none",
            background: "#E87C23", 
            color: "#FFF", 
            borderRadius: "7px", 
            opacity: 1, 
            height: "60px",
            width: "100%",
            marginTop: "30px"
          }} onClick={() => window.location.href="/account/loan"}>
            <DollarCircleFilled style={{ fontSize: "20px"}}/> <span style={{ fontSize: "16px" }}>Get a Loan</span>
          </Button>
          <div className="get-loan-container">
            <Card style={{ 
                background: "#191817",
                color: "#FFF", 
                borderRadius: "23px", 
                opacity: 1, 
                height: "145px",
                paddingTop: "20px",
                cursor: "pointer",
                width: "90%",
                display: isMobile ? "none" : "block",
                marginLeft: isMobile ? 0 : "150px",
              }}
              onClick={() => window.location.href="/account/loan"}
            >
              <CardBody className="text-center">
                <DollarCircleFilled style={{ fontSize: "40px"}} />
                <p style={{ fontSize: "16px", marginTop: "15px"}}>Get a Loan</p>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 mb-4">
        <Col xl="12" xs="12">
          <h3>Payment Registry</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
              <TabPane tab={
                <span>
                  Personal
                </span>
              } 
              key="1">
                <Table responsive hover>
                  <thead>
                    <th>UniqueID</th>
                    <th>Amount</th>
                    <th>Guarantor</th>
                    <th>Tenure</th>
                    <th>Purpose</th>
                    <th>Category</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {personalPageOfItems && personalPageOfItems.length > 0 ? personalPageOfItems.map(loan => (
                      <tr key={loan._id}>
                        <td>
                          <CreditCardFilled /> <strong>{loan.uniqueID}</strong>
                        </td>
                        <td style={{ color: "#0000006E",}}>&#8358;{loan.amount}</td>
                        <td style={{ color: "#0000006E",}}><span style={{ color: "#ff0000"}}>{loan.guarrantor && loan.guarrantor.fullname}</span></td>
                        <td style={{ color: "#0000006E",}}>{loan.tenure}</td>
                        <td style={{ color: "#0000006E",}}>{loan.purpose}</td>
                        <td style={{ color: "#0000006E",}}>{loan.category}</td>
                        <td style={{ color: "#0000006E",}}>{loan.status}</td>
                      </tr>
                    )) : <p className="text-center">No records yet</p>}
                  </tbody>
                </Table>
                {personalPager.pages && personalPager.pages.length > 1 ? (
                  <Row className="justify-content-center">
                    <div>
                      <Paginations handlePagination={handlePagination} category="personal" pager={personalPager} />
                    </div>
                  </Row>
                ) : null}
              </TabPane>
              <TabPane  tab={
                <span>
                  Salary
                </span>
              } key="2">
                <Table responsive hovered>
                  <thead>
                    <th>UniqueID</th>
                    <th>Amount</th>
                    <th>HR Name</th>
                    <th>HR Email</th>
                    <th>Tenure</th>
                    <th>Purpose</th>
                    <th>Category</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {salaryPageOfItems && salaryPageOfItems.length > 0 ? salaryPageOfItems.map(loan => (
                      <tr key={loan._id}>
                        <td>
                          <CreditCardFilled /> <strong>{loan.uniqueID}</strong>
                        </td>
                        <td style={{ color: "#0000006E",}}>&#8358;{loan.amount}</td>
                        <td style={{ color: "#0000006E",}}><span style={{ color: "#ff0000"}}>{loan.hr && loan.hr.fullname}</span></td>
                        <td style={{ color: "#0000006E",}}><span style={{ color: "#ff0000"}}>{loan.hr && loan.hr.email}</span></td>
                        <td style={{ color: "#0000006E",}}>{loan.tenure}</td>
                        <td style={{ color: "#0000006E",}}>{loan.purpose}</td>
                        <td style={{ color: "#0000006E",}}>{loan.category}</td>
                        <td style={{ color: "#0000006E",}}>{loan.status}</td>
                      </tr>
                    )) : <p className="text-center">No records found</p>}
                  </tbody>
                </Table>
                {salaryPager && salaryPager.pages && salaryPager.pages.length > 1 ? (
                  <Row className="justify-content-center">
                    <div>
                      <Paginations handlePagination={handlePagination} category="salary" pager={salaryPager} />
                    </div>
                  </Row>
                ) : null}
              </TabPane>

              <TabPane  tab={
                <span>
                  Business
                </span>
              } key="3">
                <Table responsive hovered>
                  <thead>
                    <th>UniqueID</th>
                    <th>Amount</th>
                    <th>Guarantor</th>
                    <th>Tenure</th>
                    <th>Purpose</th>
                    <th>Category</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                  {businessPageOfItems && businessPageOfItems.length > 0 ? businessPageOfItems.map(loan => (
                    <tr key={loan._id}>
                      <td>
                        <CreditCardFilled /> <strong>{loan.uniqueID}</strong>
                      </td>
                      <td style={{ color: "#0000006E",}}>&#8358;{loan.amount}</td>
                      <td style={{ color: "#0000006E",}}><span style={{ color: "#ff0000"}}>{loan.guarrantor && loan.guarrantor.fullname}</span></td>
                      <td style={{ color: "#0000006E",}}>{loan.tenure}</td>
                      <td style={{ color: "#0000006E",}}>{loan.purpose}</td>
                      <td style={{ color: "#0000006E",}}>{loan.category}</td>
                      <td style={{ color: "#0000006E",}}>{loan.status}</td>
                    </tr>
                  )) : <p className="text-center">No records found</p>}
                  </tbody>
                </Table>
                {businessPager.pages && businessPager.pages.length > 1 ? (
                  <Row className="justify-content-center">
                    <div>
                      <Paginations handlePagination={handlePagination} category="business" pager={businessPager} />
                    </div>
                  </Row>
                ) : null}
              </TabPane>
            </Tabs>
          </StickyContainer>
        </Col>
      </Row>
    </div>
  )
}

export default Home;
import { CreditCardFilled, DollarCircleFilled } from "@ant-design/icons";
import { Tabs } from "antd";
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

const Transaction = () => {
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
  const [ personalPager, setPersonalPager ] = useState({});
  const [ personalPageOfItems, setPersonalPageOfItems ] = useState([]);
  const [ businessPager, setBusinessPager ] = useState({});
  const [ businessPageOfItems, setBusinessPageOfItems ] = useState([]);
  const [ salaryPager, setSalaryPager ] = useState({});
  const [ salaryPageOfItems, setSalaryPageOfItems ] = useState([]);

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

  console.log(salaryLoan, " the salary loan")
  return (
    <div>
     
      <Row className="mt-2 mb-4">
        <Col xl="12" xs="12">
          <h3>Transactions</h3>
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
                      <tr>
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
                    <tr>
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

export default Transaction;
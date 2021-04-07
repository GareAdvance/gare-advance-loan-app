import React from "react";
import "./Employment.css";
import { Col, Row, Input, Spinner, Alert } from "reactstrap";
import { Button } from "antd";

const Employment = ({
  handleCompanyAddress,
  handleCompanyName,
  handleEmploymentClear,
  handleEmploymentSubmit,
  handleEmploymentType,
  handleJobPosition,
  company_name,
  company_address,
  employmentStatus,
  jobPosition,
  error,
  errorMsg,
  message,
  employmentType,
  account,
}) => {

  return (
    <div className="personalinfo">
      <div>
        <h4 className="heading-3"><strong>Employment Information</strong></h4>
        <p>Setup your account to receive loan</p>
      </div>

      {message.length ? (
        <Alert className="text-center" style={{ color: "#0B70A5" }}>{message}</Alert>
      ) : null}

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="fname">Employment Status</label>
          <Input id="e-type" onChange={(e) => handleEmploymentType(e)} type="select">
            <option>-Select Employment Type-</option>
            {employmentType.map((employment, i) => (<option key={i} value={employment}>{employment}</option>))}
          </Input>
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "employmentType" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      {employmentStatus === "self employed" ? (
        <>
          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="cname">Business Name</label>
              <Input value={company_name} onChange={(e) => handleCompanyName(e)} id="e-cname" type="text" placeholder="Gare finance" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "company_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="position">Position</label>
              <Input value={jobPosition} onChange={(e) => handleJobPosition(e)} id="e-position" type="text" placeholder="Accountant" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "jobPosition" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="baddress">Business Address</label>
              <Input value={company_address} onChange={(e) => handleCompanyAddress(e)} id="e-baddress" type="text" placeholder="319, Akin Ogunlewe Street, Off Ligali Ayorinde Street" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "comapany_address" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="cname">Name of Company</label>
              <Input value={company_name} onChange={(e) => handleCompanyName(e)} id="e-cname" type="text" placeholder="Gare finance" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "company_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="position">Position</label>
              <Input value={jobPosition} onChange={(e) => handleJobPosition(e)} id="e-position" type="text" placeholder="Accountant" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "jobPosition" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label htmlFor="caddress">Company Address</label>
              <Input id="e-caddress" value={company_address} onChange={(e) => handleCompanyAddress(e)} type="text" placeholder="319, Akin Ogunlewe Street, Off Ligali Ayorinde Street" />
              {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "company_address" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
            </Col>
          </Row>
        </>
      )}

      {error.length ? (
        <Row className="justify-content-center">
          <Col xs="7" xl="9">
            <p className="text-center" style={{ color: "#ff0000" }}>{error}</p>
          </Col>
        </Row>
      ) : null}
      
      <Row className="mt-5">
        <Col xs="12" xl="6">
          <Button onClick={handleEmploymentClear} className="discard-button">Discard</Button>
        </Col>
        <Col xs="12" xl="6">
        {account.employmentLoading ? <Spinner color="primary" style={{ float: "right"}} /> : (
          <Button 
            disabled={account.employmentLoading ? true : false}
            onClick={handleEmploymentSubmit}
            className="personal-info-button">
              Save 
          </Button>
        )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
        </Col>
      </Row>
    </div>
  );
}

export default Employment;
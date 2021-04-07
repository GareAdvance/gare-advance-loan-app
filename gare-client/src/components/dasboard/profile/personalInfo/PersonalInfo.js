import React, { useCallback } from "react";
import { Col, Row, Input, Alert, Spinner } from "reactstrap";
import { Button, Image } from "antd";
import { Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";

import "./PersonalInfo.css";

const PersonalInfo = ({
  handleAddress,
  handlePersonalClear,
  handleDateOfBirth,
  handlePhoto,
  handlePhone,
  dateOfBirth,
  address,
  error,
  errorMsg,
  message,
  handlePersonalSubmit,
  uploadedPhoto,
  account,
  userDetail,
  upload,
}) => {
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  
  return (
    <div className="personalinfo">
      <div>
        <h4 className="heading-3"><strong>Personal Information</strong></h4>
        <p className="personal-p">Setup your account to receive loan</p>
      </div>

      {message.length > 0 ? (
        <Alert className="text-center" style={{ color: "#0B70A5" }}>{message}</Alert>
      ) : null}

      <Row className="mt-4">
        <Col xs="12" xl="6">
          <label htmlFor="fname">First Name</label>
          <Input value={userDetail && userDetail.firstName} id="p-fname" type="text" placeholder="First name" readOnly />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "firstName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
        <Col xs="12" xl="6" className="mt-3">
          <label htmlFor="lname">Last Name</label>
          <Input value={userDetail && userDetail.lastName} id="p-lname" type="text" placeholder="Last name" readOnly />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "lastName" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="6">
          <label>Date of Birth</label>
          <Input value={dateOfBirth} id="p-dateofbirth" onChange={(e) => handleDateOfBirth(e)} type="date" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "dateOfBirth" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
        <Col xs="12" xl="6" className="phone">
          <label htmlFor="phone">Phone Number</label>
          <Input value={userDetail && userDetail.phoneNumber} onChange={(e) => handlePhone} id="p-phone" type="text" placeholder="Phone Number" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "phoneNumber" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label htmlFor="address">Permanent Address</label>
          <Input value={userDetail && userDetail.address ? userDetail.address : address} onChange={(e) => handleAddress(e)} id="p-address" type="text" placeholder="Suit 2, Magodo Road, Akowonjo, Lagos" />
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "address" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <label>Upload a valid means of identification</label>
          <div {...getRootProps()} className="text-center p-file-uploader">
            {uploadedPhoto && uploadedPhoto.length > 0 ? <Image src={uploadedPhoto} alt="identity" style={{ width: "100%", height: "100%" }} /> : (
              <>
                <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
                <i className="ri-folder-reduce-fill"></i>
                {
                  isDragActive ?
                    <p style={{ color: "#00000045"}}>Drop the files here ...</p> :
                    <div style={{ color: "#00000045"}}>
                      <Icon name="plus" />
                      <p>Upload</p>
                    </div>
                }
              </>
            )}
          </div>
          {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "meansOfIdentification" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      {upload.loading ? <Alert className="mt-4" color="info">Please wait, work ID is uploading...</Alert> : 
      upload.success ? <Alert className="mt-4" color="success">Work ID successfully uploaded</Alert> : null}
      

      <Row className="mt-5">
        <Col xs="12" xl="6">
          <Button onClick={handlePersonalClear} className="discard-button">Discard</Button>
        </Col>
        <Col xs="12" xl="6">
          <Button disabled={ upload.loading ? true : false } onClick={handlePersonalSubmit} className="personal-info-button">{account.personalInfoLoading ? <Spinner style={{ float: "right", color: "primary"}} /> : "Save"}</Button>
        </Col>
      </Row>

      {error.length ? (
        <Row className="justify-content-center mt-4">
          <Col xs="7" xl="9">
            <p className="text-center" style={{ color: "#ff0000" }}>{error}</p>
          </Col>
        </Row>
      ) : null}

      <Row className="mt-4">
        <Col xs="12" xl="12">
          <p style={{ float: "right"}}><span className="privacy">Privacy | Terms</span></p>
        </Col>
      </Row>
    </div>
  );
}

export default PersonalInfo;
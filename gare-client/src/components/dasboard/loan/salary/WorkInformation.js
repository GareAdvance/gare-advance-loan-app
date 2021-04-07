import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Input, Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "antd";
import { useDropzone } from "react-dropzone";
import { employmentInformation } from "../../../../store/actions/account";
import Employment from "../../profile/employment/Employment";
import { localStorageAuth } from "../../../../helper/authenticate";

const WorkInformation = ({
  salary,
  payday,
  companyName,
  handlePayDay,
  handleSalary,
  handleCompanyName,
  handleWorkId,
  upload,
  uploadedID,
  // errorMsg,
}) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const dispatch = useDispatch();
  const account = useSelector(state => state.accountReducer);
  const [ toggle, setToggle ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ company_name, setCompanyName ] = useState("");
  const [ company_address, setCompanyAddress ] = useState("");
  const [ jobPosition, setJopPosition ] = useState("");
  const [ employmentStatus, setEmploymentStatus ] = useState("");
  const [ userDetails, setUserDetails ] = useState({});
  const employmentType = [ "full time", "part time", "contract", "outsourced", "self employed" ];

  const userId = localStorageAuth().user && localStorageAuth().user._id;
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  console.log(account, " this is the account state");

  useEffect(() => {
    if (account && account.account) {
      setUserDetails(account.account && account.account);
    }
  }, []);

  // Employment information handler here
  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error))  setError(account.error);
    }
  }, [ account ]);

  useEffect(() => {
    if (account.employmentSuccess === true) {
      setMessage("Your employment information has been updated");
      setEmploymentStatus("");
      setCompanyAddress("");
      setJopPosition("");
      setCompanyName("");
      setTimeout(() => {
        setMessage("")
        setToggle(false);
      }, 1500);
    }
  }, [ account ]);

  

  const handleCompanyAddress = (e) => {
    setErrorMsg("");
    setError("")
    setCompanyAddress(e.target.value);
  }

  const handleJobPosition = (e) => {
    setErrorMsg("");
    setError("")
    setJopPosition(e.target.value);
  }

  const handleEmploymentType = (e) => {
    setErrorMsg("");
    setError("")
    setEmploymentStatus(e.target.value);
  }

  const handleEmploymentSubmit = () => {
    const data = { 
      employmentType: 
      employmentStatus, 
      company_address, company_name, 
      jobPosition, 
      userId,
    }
    dispatch(employmentInformation(data));
  }

  const handleEmploymentClear = () => {
    setEmploymentStatus("");
    setCompanyAddress("");
    setJopPosition("");
    setCompanyName("");
    setToggle(false);
  }

  const toggleEmployment = () => {
    setToggle(!toggle);
  }

  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Row className="mt-2">
            <Col xs="12" xl="8">
              <label htmlFor="amount">Name of Company</label>
              <Input value={companyName} onChange={(e) => handleCompanyName(e)} placeholder="Name of Company" className="form-control" />
            </Col>
            <Col xs="12" xl="4" className="pt-5">
              <Button onClick={() => setToggle(true)} className="change-button">Change</Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="6">
              <label htmlFor="salary">Monthly Salary</label>
              <Input onChange={(e) => handleSalary(e)} id="salary" value={salary} placeholder="Monthly Salary" className="form-control" />
            </Col>
            <Col xs="12" xl="6">
              <label htmlFor="payday">Pay day</label>
              <Input onChange={(e) => handlePayDay(e)} value={payday}  min="1" max="31" type="number" id="payday" placeholder="26" className="form-control" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" xl="12">
              <label>Upload your work ID card</label>
              <div {...getRootProps()} className="text-center file-uploader mb-4">
                {uploadedID && uploadedID.length > 0 ? <img src={uploadedID} alt="identity" style={{ width: "100%", height: "100%" }} /> : (
                  <>
                    <input {...getInputProps()} accept="image/jpeg,image/jpg, image/png" onChange={(e) => handleWorkId(e)} />
                    <i className="ri-folder-reduce-fill"></i>
                    {
                      isDragActive ?
                        <p style={{ color: "#00000045"}}>Drop the files here ...</p> :
                        <p style={{ color: "#00000045"}}>Drag 'n' drop some files here, or click to select files</p>
                    }
                  </>
                )}
              </div>
              {upload.loading ? <Alert color="info">Please wait. Uploading work ID...</Alert> : upload.success ? 
              <Alert color="success">Work ID uploaded</Alert> : null}
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="6"></Col>
      </Row>
      <Row>
        <Modal isOpen={toggle} toggle={toggleEmployment}>
          <ModalHeader toggle={toggleEmployment}></ModalHeader>
          <ModalBody>
            <Employment 
              setEmployment={setToggle}
              message={message}
              error={error}
              errorMsg={errorMsg}
              company_name={company_name}
              company_address={company_address}
              jobPosition={jobPosition}
              employmentStatus={employmentStatus}
              employmentType={employmentType}
              userId={userId}
              handleEmploymentClear={handleEmploymentClear}
              handleEmploymentSubmit={handleEmploymentSubmit}
              handleEmploymentType={handleEmploymentType}
              handleCompanyAddress={handleCompanyAddress}
              handleCompanyName={handleCompanyName}
              handleJobPosition={handleJobPosition}
              account
            />
          </ModalBody>
        </Modal>
      </Row>
    </div>
  );
}

export default WorkInformation;
import Avatar from "antd/lib/avatar/avatar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Progress } from "antd";
import { Card, CardBody, Input, Col, Row, Modal, ModalBody, ModalHeader, Spinner, Alert } from "reactstrap";
import { BankFilled, CreditCardFilled } from "@ant-design/icons";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Bank from "./bank/Bank";
import BVN from "./bvn/BVN";
import Employment from "./employment/Employment";
import { localStorageAuth } from "../../../helper/authenticate";
import Logo from "../../../assets/logo1.svg";
import { changePassword } from "../../../store/actions/actions_onboarding";
import { getUser, bankInfo, personalInfo, photoUpload } from "../../../store/actions/account";
import { employmentInformation } from "../../../store/actions/account";
import { bvnInformation } from "../../../store/actions/account";
import { uploader, profilePicture } from "../../../store/actions/action_file_upload";
import "./Profile.css";


const Profile = () => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.accountReducer);
  const accounts = useSelector(state => state.account);
  const upload = useSelector(state => state.upload);
  const id_card = useSelector(state => state.upload.idCard);
  const [ profilePix, setProfilePix ] = useState({});
  const [ profilePict, setProfilePict ] = useState("");
  const [ isPersonalInfo, setPersonalInfo ] = useState(false);
  const [ isBVN, setIsBVN ] = useState(false);
  const [ isEmployment, setEmployment ] = useState(false);
  const [ isBank, setBank ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState([]);
  const [ error, setError ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ isEmailReset, setEmailReset ] = useState(false);
  const [ newPassword, setNewPassword ] = useState("");
  const [ oldPassword, setOldpassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ user, setUser ] = useState({});
  const [ userDetails, setUserDetails ] = useState({});
  // Bank information parameters
  const [ bankName, setBankName ] = useState("");
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ accountName, setAccountName ] = useState("");
  const [ accountType, setAccountType ] = useState("");
  // Employment information variables
  const [ company_name, setCompanyName ] = useState("");
  const [ company_address, setCompanyAddress ] = useState("");
  const [ jobPosition, setJopPosition ] = useState("");
  const [ employmentStatus, setEmploymentStatus ] = useState("");
  const employmentType = [ "full time", "part time", "contract", "outsourced", "self employed" ];
  // BVn information variables
  const [ bvn, setBVN ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState("");
  // Personal information variables
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  
  const [ meansOfIdentification, setMeansOfIdentification ] = useState({});
  const [ uploadedPhoto, setUploadedPhoto ] = useState("");

  
  useEffect(() => {
    if (accounts && accounts.error) {
      setErrorMsg(accounts.error);
      if (!Array.isArray(account.error))  setError(account.error);
    } else if (accounts.changePasswordSuccess === true) {
      setMessage("Your password has been changed successfully");
      setConfirmPassword("");
      setNewPassword("");
      setOldpassword("");
      setTimeout(() => { 
        setEmailReset(false);
        setMessage("");
      }, 2000)
    }
  }, [ accounts ]);

  useEffect(() => {
    if (upload.success) {
      setUploadedPhoto(upload.idCard && upload.idCard.secure_url);
    } else if (upload.error) {
      setErrorMsg(upload.error.message);
    }
  }, [ id_card ]);

  useEffect(() => {
    setUserDetails(account.account);
    if (account.account && account.account && account.account.photo) {
      setProfilePict(account.account && account.account.photo)
    }
  }, [ account ]);

  // Set firstName, lastName and phone number
  useEffect(() => {
    if (userDetails && userDetails.hasOwnProperty("firstName")) {
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setPhone(userDetails.phoneNumber);
    }
  }, [ userDetails ]);

  useEffect(() => {
    const user = localStorageAuth().user && localStorageAuth().user;
    setUser(user);
  }, []);

  useEffect(() => {
    if (user && user._id) {
      const data = { userId: user._id }
      dispatch(getUser(data));
    }
    
  }, [ user,dispatch ]);

  // Bank information update section
  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error))  setError(account.error);
    } else if (account.bankSuccess) {
      setMessage("Your bank information has been updated");
      setAccountName("");
      setAccountNumber("");
      setAccountType("");
      setBankName("");
      setTimeout(() => {
        setMessage("")
        setBank(false);
      }, 1500);
    }
  }, [ account ]);

  const handleAccountName = (e) => {
    setErrorMsg("");
    setError("")
    setAccountName(e.target.value);
  }

  const handleAccountType = (e) => {
    setErrorMsg("");
    setAccountType(e.target.value);
  }

  const handleAccountNumber = (e) => {
    setErrorMsg("");
    setError("")
    setAccountNumber(e.target.value);
  }

  const handleBankName = (e) => {
    setErrorMsg("");
    setError("")
    setBankName(e.target.value);
  }

  const handleBankSubmit = () => {
    const data = { accountType, accountName, accountNumber, bankName, userId}
    dispatch(bankInfo(data));
  }

  const handleBankClear = () => {
    setAccountName("");
    setAccountNumber("");
    setAccountType("");
    setBankName("");
    setBank(false);
  }
// bank handlers end here


  // Employment information handler here
  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error))  setError(account.error);
    } else if (account.employmentSuccess === true) {
      setMessage("Your employment information has been updated");
      setEmploymentStatus("");
      setCompanyAddress("");
      setJopPosition("");
      setCompanyName("");
      setTimeout(() => {
        setMessage("")
        setEmployment(false);
      }, 1500);
    }
  }, [ account ]);

  const handleCompanyName = (e) => {
    setErrorMsg("");
    setError("")
    setCompanyName(e.target.value);
  }

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
    setEmployment(false);
  }
  // Employment information handler ends here


  // BVN information handler here
  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error))  setError(account.error);
    } else if (account.bvnSuccess === true) {
      setMessage("Your BVN information has been updated");
      setBVN("");
      setDateOfBirth("");
      setPhone("");
      setTimeout(() => {
        setMessage("");
        setIsBVN(false);
      }, 1500);
    }
  }, [ account ]);

  const handleBVN = (e) => {
    setErrorMsg("");
    setError("")
    setBVN(e.target.value);
  }

  const handleDateOfBirth = (e) => {
    setErrorMsg("");
    setError("")
    setDateOfBirth(e.target.value);
  }

  const handlePhone = (e) => {
    setErrorMsg("");
    setError("")
    setPhone(e.target.value);
  }

  const handleBVNSubmit = () => {
    const data = { bvn, phone, dateOfBirth, userId}
    dispatch(bvnInformation(data));
  }

  const handleBVNClear = () => {
    setBVN("");
    setPhone("");
    setDateOfBirth("");
    setError("");
    setErrorMsg("");
    setMessage("")
    setIsBVN(false);
  }
  // BVN information handler ends here


  // Personal information handlers start here
  const formData = new FormData();

  formData.append('file', meansOfIdentification);
  // replace this with your upload preset name
  formData.append('upload_preset', "gare-upload-preset");

  const options = {
    method: 'POST',
    body: formData,
  };

  useEffect(() => {
    if (meansOfIdentification && meansOfIdentification.name) {
      dispatch(uploader(options));
    }
  }, [ meansOfIdentification, dispatch ]);


  const handleUpload = () => {
    dispatch(uploader(options));
  }

  const handlePhoto = (e) => {
    setMeansOfIdentification(e.target.files[0]);
  }

  const handleFirstName = (e) => {
    setError("");
    setErrorMsg("");
    setMessage("");
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setError("");
    setErrorMsg("");
    setMessage("");
    setLastName(e.target.value);
  }

  const handleAddress = (e) => {
    setError("");
    setErrorMsg("");
    setMessage("");
    setAddress(e.target.value);
  }

  const handlePersonalSubmit = () => {
    const data = {
      firstName,
      lastName,
      phoneNumber: phone,
      meansOfIdentification: uploadedPhoto,
      address,
      dateOfBirth,
      userId,
    }

    dispatch(personalInfo(data));
  }

  useEffect(() => {
    if (account && account.error) {
      setErrorMsg(account.error);
      if (!Array.isArray(account.error)) setError(account.error);
    } 
  }, [ account ]);

  useEffect(() => {
    if (account.personalInfoSuccess) {
      setErrorMsg("");
      setMessage("Your personal information has been updated");
      setFirstName("");
      setLastName("");
      setPhone("");
      setDateOfBirth("")
      setUploadedPhoto("");
      setAddress("")
      setTimeout(() => {
        setMessage("")
        setPersonalInfo(false);
      }, 1500);
    }
  }, [ account ]);

  const handlePersonalClear = () => {
    setError("");
    setErrorMsg("");
    setMessage("");
    setPersonalInfo(false);
  }

  // Personal information handlers end here

  const toggleResetEmail = () => {
    setEmailReset(false);
    setConfirmPassword("");
    setNewPassword("");
    setOldpassword("");
  }

  const toggleBankInfo = () => {
    setBank(false);
  }

  const toggleBVN = () => {
    setIsBVN(false);
  }

  const toggleEmployment = () => {
    setEmployment(false);
  }

  const togglePersonal = () => {
    setPersonalInfo();
  }

  const handleOldPassword = (e) => {
    setError("");
    setErrorMsg("");
    setOldpassword(e.target.value);
  }

  const handleNewPassword = (e) => {
    setError("");
    setErrorMsg("");
    setNewPassword(e.target.value);
  }

  const handleConfirmPassword = (e) => {
    setError("");
    setErrorMsg("");
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = () => {
    const data = { oldPassword, newPassword, email: user.email };
    if (newPassword !== confirmPassword) {
      setError("Passwords did not match");
      return;
    } else {
      dispatch(changePassword(data));
    }
  }

  useEffect(() => {
    if (profilePix && profilePix.name) {
      dispatch(profilePicture(profilePix));
    }
  }, [ profilePix, dispatch ]);

  useEffect(() => {
    if (upload.profileSuccess) {
      setProfilePict(upload.upload && upload.upload.secure_url)
    } else if (upload.error) {
      setErrorMsg(upload.error.message);
    }
  }, [ upload ]);

  useEffect(() => {
    if (profilePict && profilePict.length > 0) {
      const data = {
        photo: profilePict,
        userId
      }
      dispatch(photoUpload(data));
    }
  }, [ profilePict, dispatch ]);

  return (
    <div>
      <Row>
        <Col xs="12" xl="8">
          <Row>
            <Col xs="3" xl="3">
              <Avatar src={profilePict && profilePict. length > 0 ? profilePict : userDetails && userDetails.photo} size={140} id="profile-avatar" /> 
              <Input type="file" id="profile-picture-input" accept="image/jpeg,image/jpg,image/png" onChange={(e) => setProfilePix(e.target.files[0])} />
            </Col>
            <Col xs="9" xl="7" className="profile-detail">
              <h4>Onoja Matthew</h4>
              <p style={{ lineHeight: ".5em", color: "#04040466" }}>{userDetails ? userDetails.email : user && user.email}</p>
              <p style={{ lineHeight: ".5em", color: "#04040466" }}>{userDetails ? userDetails.phoneNumber : user && user.phoneNumber}</p>
              <Button 
                style={{ 
                  color: "#0B70A5", 
                  background: "#0B70A524", 
                  width: "147px", 
                  height: "26px",
                  borderRadius: "13px",
                }}
                onClick={() => setEmailReset(true)}
              >Change password</Button>
            </Col>
          </Row>
        </Col>
        <Col xs="12" xl="4" className="profile-card-container">
          <Card id="profile-status">
            <CardBody>
              <Row>
                <Col xs="3" xl="3">
                  <Progress type="circle" percent={account.account ? account.account.profilePercentage : 0} width={70} />
                </Col>
                <Col xs="9" xl="9">
                  <p>Profile Information</p>
                  <p className="complete">
                    {account.account && account.account.profilePercentage === 100 ? "Perfect! Your profile is complete" : "Complete your profile to unlock funds"}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" xl="6">
          <Card style={{ height: "88px", background: "#fff"}}>
            <CardBody>
              <Row className="pt-1">
                <Col xs="10" xl="10">
                  <p><i className="ri-user-3-fill" style={{ color: "#E87C23", marginRight: "10px"}}></i> <span style={{ fontSize: "16px", marginTop: "-20px !important"}}>Personal Information</span></p>
                </Col>
                <Col xs="2" xl="2" className="pt-2 pr-2">
                  <Button 
                    className="add-button"
                    onClick={() => setPersonalInfo(true)}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" xl="6">
          <Card style={{ height: "88px", background: "#fff"}}>
            <CardBody>
              <Row className="pt-2">
                <Col xs="10" xl="10">
                  <p style={{ fontSize: "16px"}}><CreditCardFilled style={{ color: "#8625CF", marginRight: "10px" }} /> Bank Verification Number (BVN)</p>
                </Col>
                <Col xs="2" xl="2" className="pt-2 pr-2">
                  <Button 
                      className="add-button"
                      onClick={() => setIsBVN(true)}
                    >
                    Add
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12" xl="6">
          <Card style={{ height: "88px", background: "#fff"}}>
            <CardBody>
              <Row className="pt-2">
                <Col xs="10" xl="10">
                <BankFilled style={{ color: "#0B70A5", marginRight: "10px", fontSize: "22px" }} /> <span style={{ fontSize: "16px"}}>Employment Information</span>
                </Col>
                <Col xs="2" xl="2" className="pt-2 pr-2">
                  <Button 
                    className="add-button"
                    onClick={() => setEmployment(true)}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12" xl="6">
          <Card style={{ height: "88px", background: "#fff"}}>
            <CardBody>
              <Row className="pt-2">
                <Col xs="10" xl="10">
                  <CreditCardFilled style={{ color: "#8625CF", marginRight: "10px", fontSize: "22px" }} /> <span style={{ fontSize: "16px"}}>Bank Account Information</span>
                </Col>
                <Col xs="2" xl="2" className="pt-2 pr-2">
                  <Button
                    className="add-button"
                    onClick={() => setBank(true)}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col id="personalModal">
          <Modal isOpen={isPersonalInfo} toggle={togglePersonal}>
            <ModalHeader toggle={togglePersonal}></ModalHeader>
            <ModalBody>
              <PersonalInfo 
                handleAddress={handleAddress}
                handleFirstName={handleFirstName}
                handleLastName={handleLastName}
                handlePersonalClear={handlePersonalClear}
                handleDateOfBirth={handleDateOfBirth}
                handlePhone={handlePhone}
                lastName={lastName}
                firstName={firstName}
                // photo={meansOfIdentification}
                dateOfBirth={dateOfBirth}
                address={address}
                phone={phone}
                error={error}
                errorMsg={errorMsg}
                message={message}
                handlePhoto={handlePhoto}
                handleUpload={handleUpload}
                uploadedPhoto={uploadedPhoto}
                account={account}
                upload={upload}
                userDetail={userDetails}
                handlePersonalSubmit={handlePersonalSubmit}
              />
            </ModalBody>
          </Modal>
        </Col>
      </Row>
         
      <Row>
        <Col id="bvn-modal">
          <Modal isOpen={isBVN} toggle={toggleBVN}>
            <ModalHeader toggle={toggleBVN}></ModalHeader>
            <ModalBody>
              <BVN 
                setIsBVN={setIsBVN}
                bvn={bvn}
                phone={phone}
                dateOfBirth={dateOfBirth}
                error={error}
                errorMsg={errorMsg}
                message={message}
                userId={userId}
                handleBVN={handleBVN}
                handleDateOfBirth={handleDateOfBirth}
                handlePhone={handlePhone}
                handleBVNSubmit={handleBVNSubmit}
                handleBVNClear={handleBVNClear}
                account={account}
              />
            </ModalBody>
          </Modal>
        </Col>
      </Row>

      <Row>
        <Col id="employment-modal">
          <Modal isOpen={isEmployment} toggle={toggleEmployment}>
            <ModalHeader toggle={toggleEmployment}></ModalHeader>
            <ModalBody>
              <Employment 
                setEmployment={setEmployment}
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
        </Col>
      </Row>

      <Row>
        <Col id="bank-modal">
          <Modal isOpen={isBank} toggle={toggleBankInfo}>
            <ModalHeader toggle={toggleBankInfo}></ModalHeader>
            <ModalBody>
              <Bank 
                accountNumber={accountNumber}
                accountName={accountName}
                accountType={accountType}
                setBank={setBank}
                handleBankSubmit={handleBankSubmit}
                handleBankClear={handleBankClear}
                handleBankName={handleBankName}
                handleAccountType={handleAccountType}
                handleAccountNumber={handleAccountNumber}
                handleAccountName={handleAccountName}
                errorMsg={errorMsg}
                message={message}
                error={error}
                account={account}
              />
            </ModalBody>
          </Modal>
        </Col>
      </Row>

      <Row>
        <Col>
          <Modal isOpen={isEmailReset} toggle={toggleResetEmail}>
            <ModalHeader toggle={toggleResetEmail}></ModalHeader>
            <ModalBody>
              <div className="m-4">
                <Row className="justify-content-center">
                  <Col xs="2" xl="3" className="pl-4">
                    <img src={Logo} alt="logo" className="p-logo"/>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col xs="7" xl="7">
                    <h4 className="text-center"><strong>Change Password</strong></h4>
                    <p className="text-center">Reset your password</p>
                  </Col>
                </Row>

                {error.length ? (
                  <Row className="justify-content-center">
                    <Col xs="7" xl="9">
                      <p className="text-center" style={{ color: "#ff0000" }}>{error}</p>
                    </Col>
                  </Row>
                ) : null}

                {message.length ? (
                  <Alert className="text-center" style={{ color: "#0B70A5" }}>{message}</Alert>
                ) : null}

                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label htmlFor="opassword">Old Password</label>
                    <Input value={oldPassword} onChange={(e) => handleOldPassword(e)} type="password" id="opassword" placeholder="Old Password" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "oldPassword" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label htmlFor="password">New Password</label>
                    <Input value={newPassword} onChange={(e) => handleNewPassword(e)} type="password" id="password" placeholder="New Password" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "newPassword" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <Input value={confirmPassword} onChange={(e) => handleConfirmPassword(e)} type="password" id="cpassword" placeholder="Confirm Password" className="form-controller" />
                    {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "email" ? <span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> : null): null}
                  </Col>
                </Row>

                <Row className="mt-5 mb-5">
                  <Col xs="12" xl="12">
                    {accounts.changePasswordLoading === true ? (<div className="text-center"><Spinner color="primary" /></div>) : (<Button onClick={handleSubmit} className="reg-button">Submit</Button>)}
                  </Col>
                </Row>
              </div>
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    </div>
  )
}

export default Profile;
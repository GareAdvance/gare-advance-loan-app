import React from "react";
import { Button } from "antd";

const Prepage = () => {
  const queryparams = 
  "email=onoja@gmail.com&bookingStatus=false&businessName=fintech&businessEmail=business@gmail.com&address=some where in Nigeria&registrationNumber=43438934j434&bankName=first bank&accountNumber=0033432244&accountName=Matthew Igoche&fullName=Onoja Matthew&phone=09023456776&bvn=22232990557&dateOfBirth=09/03/2020&businessAddress=23 Olelu Street&idCard=http://myphoto.jpeg&businessAddress"
  const handleNavigation = () => {
    window.location.href = 
    `/bookings/loan?${queryparams}`;
  }

 
  return (
    <div>
      <h1>Prepage component</h1>
      <Button onClick={handleNavigation}>Request a Loan</Button>
    </div>
  );
}

export default Prepage;
import EmailVerified from './onboarding/EmailVerified';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BookingsLoan from './BookingsLoan/BookingsLoan';
import Register from './onboarding/registration/Register';
// import Prepage from './onboarding/Prepage';
import Login from './onboarding/login/Login';
import ForgotPassword from './onboarding/Forgot_password';
import ResetPassword from './onboarding/ResetPassword';
import PasswordEmail from './onboarding/PasswordEmail';
import Account from './dasboard/contents/Content';
import Auth from "../helper/LocalStorageAuth";
import Ravepay from './dasboard/payment/Payment';

function App() {
  return (
    <div>
       <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Register {...props} />} />
          <Route exact path="/verify_email/:token" render={(props) => <EmailVerified {...props} />} />
          {/* <Route exact path="/gare_bookings/loan" render={(props) => <Prepage {...props} />} /> */}
          <Route exact path="/bookingsafrica/loan" render={(props) => <BookingsLoan {...props} />} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/forgot_password" render={(props) => <ForgotPassword {...props} />} />
          <Route exact path="/reset_password/:token" render={(props) => <ResetPassword {...props} />} />
          <Route exact path="/password_email" render={(props) => <PasswordEmail {...props} />} />
          {Auth.isUserAuthenticated() ? <Route path="/account" render={(props) => <Account {...props} />} /> : <Redirect to="/" />}
          <Route exact path="/payment" render={(props) => <Ravepay {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

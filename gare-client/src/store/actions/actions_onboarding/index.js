import Auth from "../../../helper/LocalStorageAuth";
import { key } from "../../../helper/key";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SIGNIN_START = "SIGNIN_START";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const VERIFY_EMAIL_START = "VERIFY_EMAIL_START";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_FAILED = "VERIFY_EMAIL_FAILED";
export const CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";

export const CREDIT_LOGIN_START = "CREDIT_LOGIN_START";
export const CREDIT_LOGIN_SUCCESS = "CREDIT_LOGIN_SUCCESS";
export const CREDIT_LOGIN_FAILED = "CREDIT_LOGIN_FAILED";

export const signupStart = () => {
  return {
    type: SIGNUP_START
  }
}

export const signupSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    data
  }
}

export const signupFailed = (error) => {
  return {
    type: SIGNUP_FAILED,
    error
  }
}

export const signup = (data) => {
  return dispatch => {
    dispatch(signupStart());
    fetch(`${key.baseUrl}/signup`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(signupFailed(resp.error));
        dispatch(signupSuccess(resp));
      })
      .catch(err => {
        dispatch(signupFailed("Internal server error. Check your network connection and try again"));
      });
  }
}

export const signinStart = () => {
  return {
    type: SIGNIN_START
  }
}

export const signinSuccess = (data) => {
  return {
    type: SIGNIN_SUCCESS,
    data
  }
}

export const signinFailed = (error) => {
  return {
    type: SIGNIN_FAILED,
    error
  }
}

export const signin = (data, userType) => {
  return dispatch => {
    dispatch(signinStart());
    fetch(`${key.baseUrl}/login/${userType}`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(signinFailed(resp.error));
        Auth.authenticateUser(JSON.stringify(resp));
        dispatch(signinSuccess("Login success"));
      })
      .catch(err => {
        return dispatch(signinFailed("Internal server error. Check your network and try again"));
      });
  }
}

export const forgotPasswordStart = () => {
  return {
    type: FORGOT_PASSWORD_START
  }
}

export const forgotPasswordSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    data
  }
}

export const forgotPasswordFailed = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    error
  }
}

export const forgotPassword = (data, userType) => {
  return dispatch => {
    dispatch(forgotPasswordStart());
    fetch(`${key.baseUrl}/forgot_password/${userType}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(forgotPasswordFailed(resp.error));
        dispatch(forgotPasswordSuccess(resp));
      })
      .catch(err => {
        dispatch(forgotPasswordFailed("Request failed. Check your network and try again"));
      });
  }
}

export const resetPasswordStart = () => {
  return {
    type: RESET_PASSWORD_START
  }
}

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  }
}

export const resetPasswordFailed = (error) => {
  return {
    type: RESET_PASSWORD_FAILED,
    error
  }
}

export const resetPassword = (data, userType) => {
  return dispatch => {
    dispatch(resetPasswordStart());
    fetch(`${key.baseUrl}/reset_password/${userType}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(resetPasswordFailed(resp.error));
        dispatch(resetPasswordSuccess(resp));
      })
      .catch(err => {
        dispatch(resetPasswordFailed("Request failed. Check your network and try again"));
      });
  }
}

export const verifyEmailStart = () => {
  return {
    type: VERIFY_EMAIL_START
  }
}

export const verifyEmailSuccess = (data) => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    data
  }
}

export const verifyEmailFailed = (error) => {
  return {
    type: VERIFY_EMAIL_FAILED,
    error
  }
}

export const verifyEmail = (data) => {
  return dispatch => {
    dispatch(verifyEmailStart());
    fetch(`${key.baseUrl}/user/verify_email`, {
      method: "put",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(verifyEmailFailed(resp.error));
        Auth.authenticateUser(JSON.stringify(resp));
        return dispatch(verifyEmailSuccess(resp));
      })
      .catch(err => {
        dispatch(verifyEmailFailed("Internal server. Please try again"));
      });
  }
}

export const changePasswordStart = () => {
  return {
    type: CHANGE_PASSWORD_START
  }
}

export const changePasswordSuccess = (data) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data
  }
}

export const changePasswordFailed = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    error
  }
}

export const changePassword = (data) => {
  return dispatch => {
    dispatch(changePasswordStart());
    fetch(`${key.baseUrl}/user/change_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(changePasswordFailed(resp.error));
        dispatch(changePasswordSuccess(resp));
      })
      .catch(err => {
        dispatch(changePasswordFailed("Could not complete request. Please try again"));
      });
  }
}

export const creditLoginStart = () => {
  return {
    type: CREDIT_LOGIN_START
  }
}

export const creditLoginSuccess = (data) => {
  return {
    type: CREDIT_LOGIN_SUCCESS,
    data
  }
}

export const creditLoginFailed = (error) => {
  return {
    type: CREDIT_LOGIN_FAILED,
    error
  }
}

export const creditLogin = () => {
  return dispatch => {
    dispatch(creditLoginStart());
    fetch(`${key.baseUrl}/credit/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(creditLoginFailed(resp.error));
        localStorage.setItem("sessionCode", resp.sessionCode);
        dispatch(creditLoginSuccess(resp));
      })
      .catch(err => {
        dispatch(creditLoginFailed(`Internal Server Error ${err}`));
      })
  }
}
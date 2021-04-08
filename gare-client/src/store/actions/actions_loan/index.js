import fetch from "node-fetch";
import { localStorageAuth } from "../../../helper/authenticate";
import { key } from "../../../helper/key";

export const POST_LOAN_START = "POST_LOAN_START";
export const POST_LOAN_SUCCESS = "POST_LOAN_SUCCESS";
export const POST_LOAN_FAILED = "POST_LOAN_FAILED";

export const GET_LOAN_START = "GET_LOAN_START";
export const GET_LOAN_SUCCESS = "GET_LOAN_SUCCESS";
export const GET_LOAN_FAILED = "GET_LOAN_FAILED";

export const GET_BUSINESS_LOAN_START = "GET_BUSINESS_LOAN_START";
export const GET_BUSINESS_LOAN_SUCCESS = "GET_BUSINESS_LOAN_SUCCESS";
export const GET_BUSINESS_LOAN_FAILED = "GET_BUSINESS_LOAN_FAILED";

export const GET_SALARY_LOAN_START = "GET_SALARY_LOAN_START";
export const GET_SALARY_LOAN_SUCCESS = "GET_SALARY_LOAN_SUCCESS";
export const GET_SALARY_LOAN_FAILED = "GET_SALARY_LOAN_FAILED";

export const GET_PERSONAL_LOAN_START = "GET_PERSONAL_LOAN_START";
export const GET_PERSONAL_LOAN_SUCCESS = "GET_PERSONAL_LOAN_SUCCESS";
export const GET_PERSONAL_LOAN_FAILED = "GET_PERSONAL_LOAN_FAILED";

export const BUSINESS_LOAN_START = "BUSINESS_LOAN_START";
export const BUSINESS_LOAN_SUCCESS = "BUSINESS_LOAN_SUCCESS";
export const BUSINESS_LOAN_FAILED = "BUSINESS_LOAN_FAILED";

export const POST_SALARY_LOAN_START = "POST_SALARY_LOAN_START";
export const POST_SALARY_LOAN_SUCCESS = "POST_SALARY_LOAN_SUCCESS";
export const POST_SALARY_LOAN_FAILED = "POST_SALARY_LOAN_FAILED";

export const BOOKINGS_LOAN_START = "BOOKINGS_LOAN_START";
export const BOOKINGS_LOAN_SUCCESS = "BOOKINGS_LOAN_SUCCESS";
export const BOOKINGS_LOAN_FAILED = "BOOKINGS_LOAN_FAILED";


export const postLoanStart = () => {
  return {
    type: POST_LOAN_START
  }
}

export const postLoanSuccess = (data) => {
  return {
    type: POST_LOAN_SUCCESS,
    data
  }
}

export const postLoanFailed = (error) => {
  return {
    type: POST_LOAN_FAILED,
    error
  }
}

export const postLoan = (data) => {
  return dispatch => {
    dispatch(postLoanStart());
    fetch(`${key.baseUrl}/loan/personal`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token,
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        console.log(resp, " the response from action")
        if (resp.error) return dispatch(postLoanFailed(resp.error));
        dispatch(postLoanSuccess(resp));
      })
      .catch(err => {
        dispatch(postLoanFailed(`Internal server error. Refresh your browser and try again`));
      });
  }
}



// fetch single loan
export const getLoanStart = () => {
  return {
    type: GET_LOAN_START
  }
}

export const getLoanSuccess = (data) => {
  return {
    type: GET_LOAN_SUCCESS,
    data
  }
}

export const getLoanFailed = (error) => {
  return {
    type: GET_LOAN_FAILED,
    error
  }
}

export const getLoans = () => {
  return dispatch => {
    dispatch(getLoanStart());
    fetch(`${key.baseUrl}/loan/all`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getLoanFailed(resp.error));
        dispatch(getLoanSuccess(resp));
      })
      .catch(err => {
        console.log(err, " the error message");
        dispatch(getLoanFailed(`Internal server error. Refresh your browser and try again`));
      });
  }
}

export const fetchPersonalLoanStart = () => {
  return {
    type: GET_PERSONAL_LOAN_START
  }
}

export const fetchPersonalLoanSuccess = (data) => {
  return {
    type: GET_PERSONAL_LOAN_SUCCESS,
    data
  }
}

export const fetchPersonalLoanFailed = (error) => {
  return {
    type: GET_PERSONAL_LOAN_FAILED,
    error
  }
}

export const fetchPersonalLoan = (data) => {
  return dispatch => {
    dispatch(fetchPersonalLoanStart());
    fetch(`${key.baseUrl}/loan/me?category=${data.category}&page=${data.page}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(fetchPersonalLoanFailed(resp.error));
        dispatch(fetchPersonalLoanSuccess(resp));
      })
      .catch(err => {
        dispatch(fetchPersonalLoanFailed(`Internal server error. Refresh your browser and try again`));
      });
  }
}

export const businessLoanStart = () => {
  return {
    type: BUSINESS_LOAN_START
  }
}

export const businessLoanSuccess = (data) => {
  return {
    type: BUSINESS_LOAN_SUCCESS,
    data
  }
}

export const businessLoanFailed = (error) => {
  return {
    type: BUSINESS_LOAN_FAILED,
    error
  }
}

export const businessLoan = (data) => {
  return dispatch => {
    dispatch(businessLoanStart());
    fetch(`${key.baseUrl}/loan/business`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token,
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(businessLoanFailed(resp.error));
        dispatch(businessLoanSuccess(resp));
      })
      .catch(err => {
        dispatch(businessLoanFailed(`Internal server error. Refresh your browser and try again`));
      });
  }
}

export const fetchBusinessStart = () => {
  return {
    type: GET_BUSINESS_LOAN_START
  }
}

export const fetchBusinessSuccess = (data) => {
  return {
    type: GET_BUSINESS_LOAN_SUCCESS,
    data
  }
}
export const fetchBusinessFailed = (error) => {
  return {
    type: GET_BUSINESS_LOAN_FAILED,
    error
  }
}

export const fetchBusinessLoan = (data) => {
  return dispatch => {
    dispatch(fetchBusinessStart());
    fetch(`${key.baseUrl}/loan/me?category=${data.category}&page=${data.page}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(fetchBusinessFailed(resp.error));
        dispatch(fetchBusinessSuccess(resp));
      })
      .catch(err => {
        dispatch(fetchBusinessFailed(`Internal Server Error. Please try again`));
      });
  }
}

export const fetchSalaryLoanStart = () => {
  return {
    type: GET_SALARY_LOAN_START
  }
}

export const fetchSalaryLoanSuccess = (data) => {
  return {
    type: GET_SALARY_LOAN_SUCCESS,
    data
  }
}

export const fetchSalaryLoanFailed = (error) => {
  return {
    type: GET_SALARY_LOAN_FAILED,
    error
  }
}

export const fetchSalaryLoan = (data) => {
  return dispatch => {
    dispatch(fetchSalaryLoanStart());
    fetch(`${key.baseUrl}/loan/me?category=${data.category}&page=${data.page}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(fetchSalaryLoanFailed(resp.error));
        dispatch(fetchSalaryLoanSuccess(resp));
      })
      .catch(err => {
        dispatch(fetchSalaryLoanFailed(`Internal Server Error. Please try again`));
      });
  }
}

export const postSalaryStart = () => {
  return {
    type: POST_SALARY_LOAN_START
  }
}

export const postSalarySuccess = (data) => {
  return {
    type: POST_SALARY_LOAN_SUCCESS,
    data
  }
}

export const postSalaryFailed = (error) => {
  return {
    type: POST_SALARY_LOAN_FAILED,
    error
  }
}

export const salaryLoan = (data) => {
  return dispatch => {
    dispatch(postSalaryStart());
    fetch(`${key.baseUrl}/loan/salary`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localStorageAuth().token,
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(postSalaryFailed(resp.error));
        dispatch(postSalarySuccess(resp));
      })
      .catch(err => {
        dispatch(postSalaryFailed(`Internal server error. Refresh your browser and try again`));
      });
  }
}

export const postBookingLoanStart = () => {
  return {
    type: BOOKINGS_LOAN_START
  }
}

export const postBookingLoanSuccess = (data) => {
  return {
    type: BOOKINGS_LOAN_SUCCESS,
    data
  }
}

export const postBookingLoanFailed = (error) => {
  return {
    type: BOOKINGS_LOAN_FAILED,
    error
  }
}

export const postBookingLoan = (data) => {
  return dispatch => {
    dispatch(postBookingLoanStart());
    fetch(`${key.baseUrl}/gare_bookings/loan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(postBookingLoanFailed(resp.error));
        dispatch(postBookingLoanSuccess(resp));
      })
      .catch(err => {
        dispatch(postBookingLoanFailed(`Internal Server Error. ${err.message}`));
      });
  }
}
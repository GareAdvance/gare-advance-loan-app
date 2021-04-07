import fetch from "node-fetch";
import { localStorageAuth } from "../../../helper/authenticate";

export const PERSONAL_INFO_START = "PERSONAL_INFO_START";
export const PERSONAL_INFO_SUCCESS = "PERSONAL_INFO_SUCCESS";
export const PERSONAL_INFO_FAILED = "PERSONAL_INFO_FAILED";

export const BANK_INFO_START = "BANK_INFO_START";
export const BANK_INFO_SUCCESS = "BANK_INFO_SUCCESS";
export const BANK_INFO_FAILED = "BANK_INFO_FAILED";

export const BANK_LIST_START = "BANK_LIST_START";
export const BANK_LIST_SUCCESS = "BANK_LIST_SUCCESS";
export const BANK_LIST_FAILED = "BANK_LIST_FAILED";

export const EMPLOYMENT_INFO_START = "EMPLOYMENT_INFO_START";
export const EMPLOYMENT_INFO_SUCCESS = "EMPLOYMENT_INFO_SUCCESS";
export const EMPLOYMENT_INFO_FAILED = "EMPLOYMENT_INFO_FAILED";

export const BVN_START = "BVN_START";
export const BVN_SUCCESS = "BVN_SUCCESS";
export const BVN_FAILED = "BVN_FAILED";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";

export const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
export const UPLOAD_PROFILE_PICTURE_SUCCESS = "UPLOAD_PROFILE_PICTURE_SUCCESS";
export const UPLOAD_PROFILE_PICTURE_FAILED = "UPLOAD_PROFILE_PICTURE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorageAuth() && localStorageAuth().token;

// updates personal information
export const personalInfoStart = () => {
  return {
    type: PERSONAL_INFO_START
  }
}

export const personalInfoSuccess = (data) => {
  return {
    type: PERSONAL_INFO_SUCCESS,
    data
  }
}

export const personalInfoFailed = (error) => {
  return {
    type: PERSONAL_INFO_FAILED,
    error
  }
}

export const personalInfo = (data) => {
  const userId = data.userId;
  const myData = { userId }
  return dispatch => {
    dispatch(personalInfoStart());
    fetch(`${BASE_URL}/user/details`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(personalInfoFailed(resp.error));
        dispatch(personalInfoSuccess(resp));
      })
      .then(() => dispatch(getUser(myData)))
      .catch(err => {
        dispatch(personalInfoFailed("Request failed. Please check your network and try again"));
      });
  }
}

/**
 * updates bank information
 */
export const bankInfoStart = () => {
  return {
    type: BANK_INFO_START
  }
}

export const bankInfoSuccess = (data) => {
  return {
    type: BANK_INFO_SUCCESS,
    data
  }
}

export const bankInfoFailed = (error) => {
  return {
    type: BANK_INFO_FAILED,
    error
  }
}

export const bankInfo = (data) => {
  const userId = data.userId
  const myData = { userId }
  return dispatch => {
    dispatch(bankInfoStart());
    fetch(`${BASE_URL}/bank/create`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(bankInfoFailed(resp.error));
        dispatch(bankInfoSuccess(resp));
      })
      .then(() => dispatch(getUser(myData)))
      .catch(err => {
        dispatch("Request failed. Refresh your screen and try again");
      });
  }
}

export const getBanksStart = () => {
  return {
    type: BANK_LIST_START
  }
}

export const getBanksSuccess = (data) => {
  return {
    type: BANK_LIST_SUCCESS,
    data
  }
}

export const getBanksFailed = (error) => {
  return {
    type: BANK_LIST_FAILED,
    error
  }
}

export const getBanks = () => {
  return dispatch => {
    dispatch(getBanksStart());
    fetch(`${BASE_URL}/bank/all`, {
      method: "GET",
      headers: {
       ACCEPT: "application/json",
       "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getBanksFailed(resp.error));
        dispatch(getBanksSuccess(resp));
      })
      .catch(err => {
        dispatch(getBanksFailed("Request failed. Unknown server error"));
      });
  }
}

// Adds employment information
export const employmentInfoStart = () => {
  return {
    type: EMPLOYMENT_INFO_START
  }
}

export const employmentInfoSuccess = (data) => {
  return {
    type: EMPLOYMENT_INFO_SUCCESS,
    data
  }
}

export const employmentInfoFailed = (error) => {
  return {
    type: EMPLOYMENT_INFO_FAILED,
    error
  }
}

export const employmentInformation = (data) => {
  const myData = { userId: data.userId }
  return dispatch => {
    dispatch(employmentInfoStart());
    fetch(`${BASE_URL}/employment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(employmentInfoFailed(resp.error));
        dispatch(employmentInfoSuccess(resp));
      })
      .then(() => dispatch(getUser(myData)))
      .catch(err => {
        return dispatch(employmentInfoFailed("Request failed. Please try again after some time"));
      });
  }
}

// Adds BVN information

export const bvnStart = () => {
  return {
    type: BVN_START
  }
}

export const bvnSuccess = (data) => {
  return {
    type: BVN_SUCCESS,
    data
  }
}

export const bvnFailed = (error) => {
  return {
    type: BVN_FAILED,
    error
  }
}

export const bvnInformation = (data) => {
  const myData = { userId: data.userId }

  return dispatch => {
    dispatch(bvnStart());
    fetch(`${BASE_URL}/bvn/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(bvnFailed(resp.error));
        dispatch(bvnSuccess(resp));
      })
      .then(() => {
        dispatch(getUser(myData));
      })
      .catch(err => {
        dispatch(bvnFailed("Request failed. Please try again"));
      })
  }
}

export const getUserStart = () => {
  return {
    type: GET_USER_START
  }
}

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserFailed = (error) => {
  return {
    type: GET_USER_FAILED,
    error
  }
}

export const getUser = (data) => {
  return dispatch => {
    dispatch(getUserStart());
    fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: 'application/json',
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUserFailed(resp.error));
        dispatch(getUserSuccess(resp));
      })
      .catch(err => {
        dispatch(getUserFailed("Operation failed. Please try again"));
      });
  }
}

export const getUsersStart = () => {
  return {
    type: GET_USERS_START
  }
}

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    data
  }
}

export const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    error
  }
}

export const getUsers = (data) => {
  return dispatch => {
    dispatch(getUsersStart());
    fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: 'application/json',
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUsersFailed(resp.error));
        dispatch(getUsersSuccess(resp));
      })
      .catch(err => {
        dispatch(getUsersFailed("Operation failed. Please try again"));
      });
  }
}

export const profilePictureStart = () => {
  return {
    type: UPLOAD_PROFILE_PICTURE_START
  }
}

export const profilePictureSuccess = (data) => {
  return {
    type: UPLOAD_PROFILE_PICTURE_SUCCESS,
    data
  }
}

export const profilePictureFailed = (error) => {
  return {
    type: UPLOAD_PROFILE_PICTURE_FAILED,
    error
  }
}

export const photoUpload = (data) => {
  return dispatch => {
    dispatch(profilePictureStart());
    fetch(`${BASE_URL}/user/uploader`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(profilePictureFailed(resp.error));
        dispatch(profilePictureSuccess(resp));
      })
      .catch(err => {
        dispatch(profilePictureFailed(`Internal Server Error. Please try again`));
      });
  }
}

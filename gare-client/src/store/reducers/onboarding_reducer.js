import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CREDIT_LOGIN_START,
  CREDIT_LOGIN_SUCCESS,
  CREDIT_LOGIN_FAILED,
} from "../actions/actions_onboarding";

const initialState = {
  accounts: [],
  account: {},
  signupLoading: false,
  signupSuccess: false,
  signinLoading: false,
  signinSuccess: false,
  forgotPasswordLoading: false,
  forgotPasswordSuccess: false,
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
  verifyEmailSuccess: false,
  verifyEmailLoading: false,
  changePasswordSuccess: false,
  changePasswordLoading: false,
  creditLoading: false,
  creditSuccess: false,
  credit: {},
  error: ""
}

export const account = (state=initialState, action) => {
  switch(action.type) {
    case SIGNUP_START:
      return {
        ...state,
        signupLoading: true,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupSuccess: true,
        accounts: state.accounts.concat(action.data),
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        signupLoading: false,
        signupSuccess: false,
        error: action.error
      }
    case SIGNIN_START:
      return {
        ...state,
        signinLoading: true,
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signinLoading: false,
        signinSuccess: true,
        account: action.data,
      }
    case SIGNIN_FAILED:
      return {
        ...state,
        signinLoading: false,
        signinSuccess: false,
        error: action.error
      }
    case FORGOT_PASSWORD_START:
      return {
        ...state,
        forgotPasswordLoading: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: true,
        account: action.data,
      }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: false,
        error: action.error
      }
    case RESET_PASSWORD_START:
      return {
        ...state,
        resetPasswordLoading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: true,
        account: action.data,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: false,
        error: action.error
      }
    case VERIFY_EMAIL_START:
      return {
        ...state,
        verifyEmailLoading: true,
      }
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyEmailLoading: false,
        verifyEmailSuccess: true,
        account: action.data,
      }
    case VERIFY_EMAIL_FAILED:
      return {
        ...state,
        verifyEmailLoading: false,
        verifyEmailSuccess: false,
        error: action.error
      }
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        changePasswordLoading: true,
        
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
        account: action.data,
      }
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: false,
        error: action.error
      }
    case CREDIT_LOGIN_START:
      return {
        ...state,
        creditLoading: true,
        creditSuccess: false,
      }
    case CREDIT_LOGIN_SUCCESS:
      return {
        ...state,
        creditLoading: false,
        creditSuccess: true,
        credit: action.data,
      }
    case CREDIT_LOGIN_FAILED:
      return {
        ...state,
        creditLoading: false,
        creditSuccess: false,
        error: action.error
      }
    default:
      return state
  }
}
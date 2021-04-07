import {
  POST_LOAN_START,
  POST_LOAN_SUCCESS,
  POST_LOAN_FAILED,
  GET_LOAN_START,
  GET_LOAN_SUCCESS,
  GET_LOAN_FAILED,
  BUSINESS_LOAN_START,
  BUSINESS_LOAN_SUCCESS,
  BUSINESS_LOAN_FAILED,
  GET_BUSINESS_LOAN_START,
  GET_BUSINESS_LOAN_SUCCESS,
  GET_BUSINESS_LOAN_FAILED,
  GET_SALARY_LOAN_START,
  GET_SALARY_LOAN_SUCCESS,
  GET_SALARY_LOAN_FAILED,
  GET_PERSONAL_LOAN_START,
  GET_PERSONAL_LOAN_SUCCESS,
  GET_PERSONAL_LOAN_FAILED,
  POST_SALARY_LOAN_START,
  POST_SALARY_LOAN_SUCCESS,
  POST_SALARY_LOAN_FAILED,
  BOOKINGS_LOAN_START,
  BOOKINGS_LOAN_SUCCESS,
  BOOKINGS_LOAN_FAILED,
} from "../actions/actions_loan"

const initialState = {
  loans: [],
  business: [],
  salary: [],
  personal: [],
  success: false,
  loading: false,
  getBusinessSuccess: false,
  getBusinessLoading: false,
  getSalaryLoading: false,
  getSalarySuccess: false,
  businessLoanLoading: false,
  businessLoanSuccess: false,
  personalLoading: false,
  personalSuccess: false,
  post_salary_loading: false,
  post_salary_success: false,
  bookingsLoading: false,
  bookingsSuccess: false,
  error: ""
}

export const loan = (state=initialState, action) => {
  switch(action.type) {
    case POST_LOAN_START:
      return {
        ...state,
        loading: true,
      }
    case POST_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loans: action.data,
      }
    case POST_LOAN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      }
    case GET_PERSONAL_LOAN_START:
      return {
        ...state,
        personalLoading: true,
        personalSuccess: false,
      }
    case GET_PERSONAL_LOAN_SUCCESS:
      return {
        ...state,
        personalLoading: false,
        personalSuccess: true,
        personal: action.data,
      }
    case GET_PERSONAL_LOAN_FAILED:
      return {
        ...state,
        personalLoading: true,
        personalSuccess: false,
        personal: action.data,
        error: action.error
      }
    case GET_LOAN_START:
      return {
        ...state,
        loading: true,
      }
    case GET_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loans: action.data,
      }
    case GET_LOAN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      }
    case BUSINESS_LOAN_START:
      return {
        ...state,
        businessLoanLoading: true,
      }
    case BUSINESS_LOAN_SUCCESS:
      return {
        ...state,
        businessLoanLoading: false,
        businessLoanSuccess: true,
        loans: action.data,
      }
    case BUSINESS_LOAN_FAILED:
      return {
        ...state,
        businessLoanLoading: false,
        businessLoanSuccess: false,
        error: action.error
      }
    case GET_BUSINESS_LOAN_START:
      return {
        ...state,
        getBusinessLoading: true,
        getBusinessSuccess: false,
      }
    case GET_BUSINESS_LOAN_SUCCESS:
      return {
        ...state,
        getBusinessLoading: false,
        getBusinessSuccess: true,
        business: action.data,
      }
    case GET_BUSINESS_LOAN_FAILED:
      return {
        ...state,
        getBusinessLoading: false,
        getBusinessSuccess: false,
        error: action.error
      }
    case GET_SALARY_LOAN_START:
      return {
        ...state,
        getSalaryLoading: true,
        getSalarySuccess: false,
      }
    case GET_SALARY_LOAN_SUCCESS:
      return {
        ...state,
        getSalaryLoading: false,
        getSalarySuccess: true,
        salary: action.data,
      }
    case GET_SALARY_LOAN_FAILED:
      return {
        ...state,
        getSalaryLoading: false,
        getSalarySuccess: false,
        error: action.error
      }
    case POST_SALARY_LOAN_START:
      return {
        ...state,
        post_salary_loading: true,
        post_salary_success: false,
      }
    case POST_SALARY_LOAN_SUCCESS:
      return {
        ...state,
        post_salary_loading: false,
        post_salary_success: true,
        salary: action.data,
      }
    case POST_SALARY_LOAN_FAILED:
      return {
        ...state,
        post_salary_loading: false,
        post_salary_success: false,
        error: action.error
      }
    case BOOKINGS_LOAN_START:
      return {
        ...state,
        bookingsLoading: true,
        bookingsSuccess: false,
      }
    case BOOKINGS_LOAN_SUCCESS:
      return {
        ...state,
        bookingsLoading: false,
        bookingsSuccess: true,
        loans: state.loans.concat(action.data),
      }
    case BOOKINGS_LOAN_FAILED:
      return {
        ...state,
        bookingsLoading: false,
        bookingsSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}
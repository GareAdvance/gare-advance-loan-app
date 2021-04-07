import {
  PERSONAL_INFO_START,
  PERSONAL_INFO_SUCCESS,
  PERSONAL_INFO_FAILED,
  BANK_INFO_START,
  BANK_INFO_SUCCESS,
  BANK_INFO_FAILED,
  EMPLOYMENT_INFO_START,
  EMPLOYMENT_INFO_SUCCESS,
  EMPLOYMENT_INFO_FAILED,
  BVN_START,
  BVN_SUCCESS,
  BVN_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  BANK_LIST_START,
  BANK_LIST_SUCCESS,
  BANK_LIST_FAILED,
  UPLOAD_PROFILE_PICTURE_START,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAILED,
} from "../actions/account";

const initialState = {
  accounts: [],
  banks: [],
  account: {},
  employmentLoading: false,
  employmentSuccess: false,
  bvnLoading: false,
  bvnSuccess: false,
  bankLoading: false,
  bankSuccess: false,
  personalInfoLoading: false,
  personalInfoSuccess: false,
  userLoading: false,
  bankListSuccess: false,
  bankListLoading: false,
  photoSuccess: false,
  photoLoading: false,
  userSuccess: false,
  usersLoading: false,
  usersSuccess: false,
  error: ""
}

export const accountReducer = (state=initialState, action) => {
  switch (action.type) {
    case PERSONAL_INFO_START:
      return {
        ...state,
        personalInfoLoading: true
      }
    case PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        personalInfoLoading: false,
        personalInfoSuccess: true,
        accounts: state.accounts.concat(action.data),
      }
    case PERSONAL_INFO_FAILED:
      return {
        ...state,
        personalInfoLoading: false,
        personalInfoSuccess: false,
        error: action.error
      }
    case BANK_INFO_START:
      return {
        ...state,
        bankLoading: true
      }
    case BANK_INFO_SUCCESS:
      return {
        ...state,
        bankLoading: false,
        bankSuccess: true,
        accounts: state.accounts.concat(action.data),
      }
    case BANK_INFO_FAILED:
      return {
        ...state,
        bankLoading: false,
        bankSuccess: false,
        error: action.error
      }
    case BANK_LIST_START:
      return {
        ...state,
        bankListLoading: true,
      }
    case BANK_LIST_SUCCESS:
      return {
        ...state,
        bankListLoading: false,
        bankListSuccess: true,
        banks: action.data,
      }
    case BANK_LIST_FAILED:
      return {
        ...state,
        bankListLoading: false,
        bankListSuccess: false,
        error: action.error
      }
    case EMPLOYMENT_INFO_START:
      return {
        ...state,
        employmentLoading: true
      }
    case EMPLOYMENT_INFO_SUCCESS:
      return {
        ...state,
        employmentLoading: false,
        employmentSuccess: true,
        accounts: state.accounts.concat(action.data),
      }
    case EMPLOYMENT_INFO_FAILED:
      return {
        ...state,
        employmentLoading: false,
        employmentSuccess: false,
        error: action.error
      }
    case BVN_START:
      return {
        ...state,
        bvnLoading: true
      }
    case BVN_SUCCESS:
      return {
        ...state,
        bvnLoading: false,
        bvnSuccess: true,
        accounts: state.accounts.concat(action.data),
      }
    case BVN_FAILED:
      return {
        ...state,
        bvnLoading: false,
        bvnSuccess: false,
        error: action.error
      }
    case GET_USER_START:
      return {
        ...state,
        userLoading: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userSuccess: true,
        account: action.data,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        userLoading: false,
        userSuccess: false,
        error: action.error
      }
    case GET_USERS_START:
      return {
        ...state,
        usersLoading: true,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: true,
        accounts: action.data,
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: false,
        error: action.error
      }
    case UPLOAD_PROFILE_PICTURE_START:
      return {
        ...state,
        photoLoading: true,
        photoSuccess: false,
      }
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        photoLoading: false,
        photoSuccess: true,
        account: action.data,
      }
    case UPLOAD_PROFILE_PICTURE_FAILED:
      return {
        ...state,
        photoLoading: false,
        photoSuccess: false,
        error: action.error
      }  
    default:
      return state;
  }
}
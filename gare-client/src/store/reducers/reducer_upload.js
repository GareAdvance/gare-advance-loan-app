import {
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
  UPLOAD_PROFILE_PICTURE_START,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAILED,
} from "../actions/action_file_upload";

const initialState = {
  upload: {},
  idCard: {},
  loading: false,
  success: false,
  profileLoading: false,
  profileSuccess: false,
  error: ""
}

export const upload = (state=initialState, action) => {
  switch (action.type) {
    case UPLOAD_START:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        idCard: action.data,
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UPLOAD_PROFILE_PICTURE_START:
      return {
        ...state,
        profileLoading: true,
        profileSuccess: false,
      }
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        profileSuccess: true,
        upload: action.data,
      }
    case UPLOAD_PROFILE_PICTURE_FAILED:
      return {
        ...state,
        profileLoading: false,
        profileSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}
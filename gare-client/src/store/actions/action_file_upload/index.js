import fetch from "node-fetch";

export const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
export const UPLOAD_PROFILE_PICTURE_SUCCESS = "UPLOAD_PROFILE_PICTURE_SUCCESS";
export const UPLOAD_PROFILE_PICTURE_FAILED = "UPLOAD_PROFILE_PICTURE_FAILED";

export const UPLOAD_START = "UPLOAD_START";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

const BASE_URL = process.env.REACT_APP_UPLOAD_URL;

export const uploadStart = () => {
  return {
    type: UPLOAD_START
  }
}

export const uploadSuccess = (data) => {
  return {
    type: UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = (error) => {
  return {
    type: UPLOAD_FAILED,
    error
  }
}

export const uploader = (options) => {
  return dispatch => {
    dispatch(uploadStart());
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, options)
    .then(response => response.json())
    .then(resp => {
      dispatch(uploadSuccess(resp));
    })
    .catch(err => {
      dispatch(uploadFailed(err));
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

export const profilePicture = (data) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append('upload_preset', "gare-upload-preset");
  const config = {
    method: "POST",
    body: formData
  }
  return dispatch => {
    dispatch(profilePictureStart());
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, config)
      .then(response => response.json())
      .then(resp => {
        dispatch(profilePictureSuccess(resp));
      })
      .catch(err => {
        dispatch(profilePictureFailed("Request failed"));
      });
  }
}
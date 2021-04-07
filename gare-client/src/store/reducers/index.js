import { combineReducers } from "redux";
import { account } from "./onboarding_reducer";
import { accountReducer } from "./account_reducer";
import { upload } from "./reducer_upload";
import { loan } from "./loan";

const rootReducer = combineReducers({
  account,
  accountReducer,
  upload,
  loan
});

export default rootReducer;
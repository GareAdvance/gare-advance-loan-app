import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import 'semantic-ui-css/semantic.min.css'
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import './index.css';
import App from './components/App';
import rootReducer from "./store/reducers"

let store;

store = process.env.NODE_ENV === "production" ? createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware(thunk))
) : createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

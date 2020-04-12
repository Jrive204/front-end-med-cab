import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import logger from "redux-logger";
// Reducer
import rootReducer from "./Reducers";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

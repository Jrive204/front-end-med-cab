import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducer from "./Reducers/combinedReducer";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const store = createStore(combinedReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
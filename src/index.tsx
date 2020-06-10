// polyfill
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// logger
import "src/utils/logger";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/store";
import App from "./pages/App";
import { Reset } from "styled-reset";
import { Normalize } from "styled-normalize";
import { GlobalCss } from "./styles/Global";
import "nprogress/nprogress.css";

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <Reset />
    <GlobalCss />
    <App />
  </Provider>,
  document.getElementById("root")
);

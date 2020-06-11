// polyfill
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// logger
import "src/utils/logger";

import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { AppProvider } from "./store/app";
import { Reset } from "styled-reset";
import { Normalize } from "styled-normalize";
import { GlobalCss } from "./styles/Global";
import "nprogress/nprogress.css";

ReactDOM.render(
  <AppProvider>
    <Normalize />
    <Reset />
    <GlobalCss />
    <App />
  </AppProvider>,
  document.getElementById("root")
);

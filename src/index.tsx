// polyfill
import "react-app-polyfill/ie11";
import "core-js/features/array/find";
import "core-js/features/array/find-index";
import "core-js/features/array/fill";
import "core-js/features/array/copy-within";
import "core-js/features/array/flat";
import "core-js/features/array/flat-map";
import "core-js/features/array/includes";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/store";
import App from "./pages/App";
import { Reset } from "styled-reset";
import { Normalize } from "styled-normalize";

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <Reset />
    <App />
  </Provider>,
  document.getElementById("root")
);

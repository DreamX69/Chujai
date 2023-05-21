import React from "react";
import ReactDOM from "react-dom";
import { LiffProvider } from "react-liff";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const liffId = process.env.REACT_APP_LINE_LIFF_ID;

ReactDOM.render(
  <React.StrictMode>
    <LiffProvider liffId={liffId}>
      <App />
    </LiffProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
// Readers: To prepare this project for building along in `./App.js`:
// [1] Comment out this line:
import AppWrapper from "./App";
// [2] Un-comment this line:
// import App from "./App";

import "./index.css";

import "./semantic-dist/semantic.min.css";

ReactDOM.render(<AppWrapper.App />, document.getElementById("root"));

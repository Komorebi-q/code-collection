import React from "react";
import ReactDom from "react-dom";

import App from "@page/app.jsx";
import "./sw";

ReactDom.render(<App />, document.querySelector("#app"));

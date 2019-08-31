import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Layout from "@page/layout/index.jsx";
import Install from "./install";

import "./../style/index.scss";

const history = createBrowserHistory();

class App extends React.Component {
  state = {};

  render() {
    const props = this.props;

    return (
      <Router history={history}>
        <Install />
        <Layout />
      </Router>
    );
  }
}

export default App;

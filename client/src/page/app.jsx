import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Layout from "@page/layout/index.jsx";

import "./../style/index.scss";

const history = createBrowserHistory();

class App extends React.Component {
  state = {};

  render() {
    const props = this.props;

    return (
      <Router history={history}>
        <Layout />
      </Router>
    );
  }
}

export default App;

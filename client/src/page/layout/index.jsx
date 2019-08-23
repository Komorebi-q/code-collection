import React from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import Footer from "./footer";

import "./style/layout.scss";

class Layout extends React.Component {
  state = {};

  render() {
    const props = this.props;

    return (
      <div className="layout">
        <Sidebar />
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
export default Layout;

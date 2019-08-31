import React from "react";

import PaginationComp from "./pagination";
import PaginationTotal from "./total";
import PaginationJumper from "./jumper";

import "./style/index.scss";

const props = {
  current: "number",
  defaultCurrent: "number",
  defaultPageSize: "number",
  disabled: "boolean",
  hideOnSinglePage: "boolean",
  itemRender: "(page, 'page' | 'prev' | 'next', originEle) => React.ReactNode",
  pageSize: "number",
  pageSizeOptions: "string[]",
  showQuickJumper: "boolean",
  showSizeChanger: "boolean",
  showTotal: "boolean",
  simple: "boolean",
  size: "string",
  total: "number",
  onChange: "(page, pageSize) => void",
  onShowSizeChange: "(current, size) => void"
};

class Pagination extends React.Component {
  state = {
    current: 0,
    // defaultCurrent: 0,
    // defaultPageSize: 10,
    disabled: false,
    hideOnSinglePage: false,
    pageSize: 10,
    pageSizeOptions: [],
    showQuickJumper: false,
    showSizeChanger: false,
    showTotal: false,
    simple: false,
    size: "normal",
    total: 0
  };

  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  render() {
    const state = this.state;
    const totalPage = Math.ceil(state.total / state.pageSize);

    const contentProps = {
      current: state.current,
      pageSize: state.pageSize,
      totalPage,
      pageSizeOptions: state.pageSizeOptions,
      simple: state.simple,
      itemRender: state.itemRender,
      onChange: this.handleContentChange,
      size: this.state.size
    };

    const totalProps = {
      current: state.current,
      pageSize: state.pageSize,
      total: state.total,
      pageSizeOptions: state.pageSizeOptions,
      size: this.state.size
    };

    const JumperProps = {
      total: state.total,
      current: state.current,
      onChange: this.handleContentChange
    };

    return state.hideOnSinglePage && totalPage <= 1 ? (
      ""
    ) : (
      <div className="pagination-wrap">
        <PaginationTotal {...totalProps} />
        <PaginationComp {...contentProps} />
        <PaginationJumper {...JumperProps} />
      </div>
    );
  }

  init = props => {
    this.setState({
      ...this.state,
      ...props
    });
  };

  handleContentChange = current => {
    this.setState({
      current
    });

    if (this.state.onChange) {
      this.setState.onChange(current, this.state.pageSize);
    }
  };
}

export default Pagination;

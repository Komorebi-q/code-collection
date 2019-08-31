import React from "react";
import "./style/input.scss";

const props = {
  addonAfter: "string | ReactNode",
  addonBefore: "string | ReactNode",
  defaultValue: "string",
  disabled: "boolean",
  id: "string",
  prefix: "string",
  size: "string",
  suffix: "string | ReactNode",
  type: "string",
  value: "string",
  onChange: "function (e)",
  onPressEnter: "function (e)",
  allowClear: "boolean"
};

class Input extends React.Component {
  state = {};
  ref = React.createRef();

  // componentDidMount() {
  //   const state = this.state;
  //   const props = this.props;

  //   if (props.ref) {
  //     props.ref = ref;
  //   }
  // }

  render() {
    const state = this.state;
    const props = this.props;

    const inputProps = {
      ...props,
      className: `k-input input-size-${props.size || "small"} ${
        props.addonBefore ? "has-before" : ""
      } ${props.addonAfter ? "has-after" : ""}
      ${props.className || ""}`,
      onChange: e => {
        if (props.onChange) {
          props.onChange(e);
        }
      }
    };

    return (
      <div className="k-input-group-wrap">
        <div className="k-input-wrap k-input-group">
          <div className="k-input-before-wrap">
            {props.addonBefore ? (
              <div className="k-input-before-wrap">{props.addonBefore}</div>
            ) : (
              props.addonBefore
            )}
          </div>

          <input {...inputProps} />

          <div className="k-input-after-wrap">
            {props.addonAfter ? (
              <div className="k-input-after-wrap">{props.addonAfter}</div>
            ) : (
              props.addonAfter
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Input;

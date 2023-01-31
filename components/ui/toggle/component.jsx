import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./toggle.module.scss";

class Toggle extends PureComponent {
  render() {
    const { color, onToggle, value, theme } = this.props;

    return (
      <button
        role="switch"
        aria-label="toggle"
        aria-checked={value && value.toString()}
        className={`${styles["c-toggle"]} ${value ? styles["-active"] : ""} ${
          theme || ""
        }`}
        style={{ backgroundColor: value && color ? color : null }}
        onClick={(e) => onToggle(!value, e)}
      />
    );
  }
}

Toggle.propTypes = {
  color: PropTypes.string,
  onToggle: PropTypes.func,
  value: PropTypes.bool,
  theme: PropTypes.string,
};

export default Toggle;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./checkbox.module.scss";

class Checkbox extends PureComponent {
  render() {
    const { className, value } = this.props;
    return (
      <div className={cx(styles["c-checkbox"], className)}>
        <span
          className={cx(styles["green-square"], { [styles.checked]: value })}
        />
      </div>
    );
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
};

export default Checkbox;

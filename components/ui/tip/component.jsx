import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./tip.module.scss";

class Tip extends PureComponent {
  render() {
    const { text, html, className } = this.props;
    if (html) {
      return (
        <div
          className={cx(styles["c-tip"], className)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ); // eslint-disable-line
    }
    return <div className={cx(styles["c-tip"], className)}>{text}</div>;
  }
}

Tip.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  html: PropTypes.string,
  className: PropTypes.string,
};

export default Tip;

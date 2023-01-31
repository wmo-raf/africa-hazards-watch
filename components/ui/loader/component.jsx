import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./loader.module.scss";

class Loader extends PureComponent {
  render() {
    const { className, theme, message } = this.props;
    return (
      <div className={`${styles["c-loader"]} ${className} ${theme}`}>
        <div className={styles.spinner} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }
}

Loader.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  message: PropTypes.string,
};

export default Loader;

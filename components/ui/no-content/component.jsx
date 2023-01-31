import React from "react";
import PropTypes from "prop-types";

import tree from "assets/icons/tree.png";

import styles from "./no-contant.module.scss";

const NoContent = ({ className, message, icon, children }) => (
  <div className={`${styles["c-no-content"]} ${className}`}>
    <p className={styles.message}>
      {children || message}¬
      {icon && <img className={styles["message-icon"]} src={tree} alt="tree" />}
    </p>
  </div>
);

NoContent.propTypes = {
  icon: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
};

NoContent.defaultProps = {
  icon: false,
};

export default NoContent;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import Icon from "components/ui/icon";

import treeImage from "assets/icons/tree-success.png";
import treeImageError from "assets/icons/error.svg?sprite";

import styles from "./confirmation-message.module.scss";

class Thankyou extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.bool,
  };

  render() {
    const { title, description, error } = this.props;

    return (
      <div className={styles["c-thankyou"]}>
        <div className={styles.message}>
          {error && <Icon icon={treeImageError} className={styles["error-tree"]} />}
          {!error && <img src={treeImage} alt="thank-you-tree" />}
          <h1>{title}</h1>
          {description && <p>{ReactHtmlParser(description)}</p>}
        </div>
      </div>
    );
  }
}

export default Thankyou;

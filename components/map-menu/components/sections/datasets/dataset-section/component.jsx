import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./dataset-section.module.scss";

class DatasetSection extends PureComponent {
  render() {
    const { title, subTitle, children } = this.props;
    return (
      <div className={styles["c-dataset-section"]}>
        {(title || subTitle) && (
          <div className={styles["dataset-header"]}>
            {title && <div className={styles.title}>{title}</div>}
            {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }
}

DatasetSection.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
};

export default DatasetSection;

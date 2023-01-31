import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./basemaps.module.scss";

class LegendBasemaps extends PureComponent {
  render() {
    const { className } = this.props;

    return (
      <div className={`${styles["c-legend-basemaps"]} ${className || ""}`}>
        <div className={styles.title}>Satellite imagery</div>
        such basemaps
      </div>
    );
  }
}

LegendBasemaps.propTypes = {
  className: PropTypes.string,
};

export default LegendBasemaps;

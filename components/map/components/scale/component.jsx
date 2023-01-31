import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./scale.module.scss";

class MapScale extends PureComponent {
  render() {
    const {
      scales: { imperial, metric },
      className,
    } = this.props;

    return (
      <div className={cx(styles["c-map-scale"], className)}>
        {imperial && (
          <span
            className={`${styles.scale} ${styles["imperial-scale"]}`}
            style={{
              width: imperial.width,
            }}
          >
            {imperial.scale}
          </span>
        )}
        {metric && (
          <span
            className={`${styles.scale} ${styles["metric-scale"]}`}
            style={{
              width: metric.width,
            }}
          >
            {metric.scale}
          </span>
        )}
      </div>
    );
  }
}

MapScale.propTypes = {
  scales: PropTypes.object,
  className: PropTypes.string,
};

export default MapScale;

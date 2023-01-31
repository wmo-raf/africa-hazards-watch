import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Map from "components/map";
import MiniLegend from "../mini-legend";

import styles from "./map.module.scss";

class MainMapComponent extends PureComponent {
  renderInfoTooltip = (string) => (
    <div>
      <p className={styles["tooltip-info"]}>{string}</p>
    </div>
  );

  render() {
    const { handleLocationChange } = this.props;

    return (
      <div className={styles["c-dashboard-map"]}>
        <Map className={styles["dashboard-map"]} onClickAnalysis={handleLocationChange} />
        <MiniLegend className={styles["mini-legend"]} />
      </div>
    );
  }
}

MainMapComponent.propTypes = {
  handleLocationChange: PropTypes.func,
};

export default MainMapComponent;

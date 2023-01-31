import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popup } from "react-map-gl";
import { format, parse, parseISO } from "date-fns";

import styles from "./map-tooltip.module.scss";

class MapToolTip extends Component {
  renderData = () => {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return data.map((c, i) => {
      if (c.type && c.type === "date" && c.format) {
        const date = parseISO(c.value);
        c.value = format(date, c.format);
      }

      return (
        <p className={styles["tooltip-content"]} key={i}>
          {c.hideLabel ? "" : `${c.label} : `}
          {c.value} {c.units && c.units}
        </p>
      );
    });
  };

  render() {
    const { latlng, feature } = this.props;

    const longitude =
      feature &&
      feature.geometry &&
      feature.geometry.type === "Point" &&
      feature.geometry.coordinates[0];
    const latitude =
      feature &&
      feature.geometry &&
      feature.geometry.type === "Point" &&
      feature.geometry.coordinates[1];

    return latlng && latlng.lat && feature ? (
      <Popup
        latitude={latitude ? latitude : latlng.lat}
        longitude={longitude ? longitude : latlng.lng}
        closeButton={false}
        offsetTop={-10}
        className={styles["map-tooltip"]}
        tipSize={8}
      >
        <div className="">{this.renderData()}</div>
      </Popup>
    ) : null;
  }
}

export default MapToolTip;

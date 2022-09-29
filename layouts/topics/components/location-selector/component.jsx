import React, { PureComponent } from "react";

import PointSelector from "./components/point-selector";

import "./styles.scss";

class LocationSelectorComponent extends PureComponent {
  render() {
    const { location, handleLocationChange } = this.props;

    const { type } = location || {};

    if (type === "point") {
      return (
        <PointSelector onChange={handleLocationChange} location={location} />
      );
    }

    return null;
  }
}

export default LocationSelectorComponent;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

class Alerts extends PureComponent {
  static propTypes = {
    setMenuSettings: PropTypes.func,
    setMenuLoading: PropTypes.func,
    setMapSettings: PropTypes.func,
    loading: PropTypes.bool,
    isDesktop: PropTypes.bool,
  };

  render() {
    const { isDesktop } = this.props;

    return (
      <div className="c-map-menu-alerts">
        {isDesktop && <h3>Weather Warnings</h3>}

        <div className="alerts-wrapper"></div>
      </div>
    );
  }
}

export default Alerts;

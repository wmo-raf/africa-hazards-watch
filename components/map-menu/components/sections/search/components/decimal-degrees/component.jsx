import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { validateLat, validateLng, validateLatLng } from "utils/geoms";

import Button from "components/ui/button";

import styles from "./decimal-degrees.module.scss";

class DecimalDegreeSearch extends PureComponent {
  state = {
    error: false,
    lat: "",
    lng: "",
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13 && !this.state.error) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { lat, lng } = this.state;
    const { setMapSettings } = this.props;
    setMapSettings({
      center: { lat: parseFloat(lat), lng: parseFloat(lng) },
    });
  };

  handleSetLocationState = (stateObj) => {
    if (!this.state.error) {
      this.setState(stateObj);
    }
  };

  handleSetLatLng = (lat, lng) => {
    this.setState({ lat, lng });
    if (validateLatLng(lat, lng)) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { lat, lng, error } = this.state;

    return (
      <div className={styles["c-decimal-degrees"]}>
        <span className={styles.label}>Lat:</span>
        <input
          value={lat}
          onChange={(e) => this.handleSetLatLng(e.target.value, lng)}
          className={cx(styles["coord-input"], {
            [styles.error]: lat && !validateLat(lat),
          })}
          onKeyDown={this.handleKeyPress}
        />
        <span className={styles.label}>Lng:</span>
        <input
          value={lng}
          onChange={(e) => this.handleSetLatLng(lat, e.target.value)}
          className={cx(styles["coord-input"], {
            [styles.error]: lng && !validateLng(lng),
          })}
          onKeyDown={this.handleKeyPress}
        />
        <Button
          className={styles["submit-btn"]}
          onClick={this.handleSubmit}
          disabled={error || !lat || !lng}
        >
          GO TO POSITION
        </Button>
        {error && <p className={styles["error-message"]}>Invalid lat lng</p>}
      </div>
    );
  }
}

DecimalDegreeSearch.propTypes = {
  setMapSettings: PropTypes.func,
};

export default DecimalDegreeSearch;

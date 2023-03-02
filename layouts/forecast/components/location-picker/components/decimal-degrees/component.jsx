import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

import Button from "components/ui/button";
import { validateLat, validateLng, validateLatLng } from "utils/geoms";

import "./styles.scss";

class DecimalDegreeSearch extends PureComponent {
  state = {
    error: false,
    lat: "",
    lng: "",
  };

  componentDidMount() {
    this.setLocationFromProps();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    if (!isEmpty(location) && !isEqual(location, prevLocation)) {
      this.setLocationFromProps();
    }
  }

  setLocationFromProps = () => {
    const { location } = this.props;
    if (location && location.type && location.type === "point") {
      const lat = location.adm0 && parseFloat(location.adm0);
      const lng = location.adm1 && parseFloat(location.adm1);

      if (lat && lng && validateLatLng(lat, lng)) {
        this.setState({ lat, lng });
      }
    }
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13 && !this.state.error) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { lat, lng } = this.state;

    if (this.props.handleOnSubmit) {
      this.props.handleOnSubmit({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
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
      <div className="c-decimal-degrees">
        <div className="coord-wrapper">
          <span className="label">Lat:</span>
          <input
            value={lat}
            onChange={(e) => this.handleSetLatLng(e.target.value, lng)}
            className={cx("coord-input", { error: lat && !validateLat(lat) })}
            onKeyDown={this.handleKeyPress}
          />
        </div>
        <div className="coord-wrapper">
          <span className="label">Lng:</span>
          <input
            value={lng}
            onChange={(e) => this.handleSetLatLng(lat, e.target.value)}
            className={cx("coord-input", { error: lng && !validateLng(lng) })}
            onKeyDown={this.handleKeyPress}
          />
        </div>

        <Button
          className="submit-btn"
          onClick={this.handleSubmit}
          disabled={error || !lat || !lng}
        >
          GO TO POSITION
        </Button>
        {error && <p className="error-message">Invalid lat lng</p>}
      </div>
    );
  }
}

DecimalDegreeSearch.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default DecimalDegreeSearch;

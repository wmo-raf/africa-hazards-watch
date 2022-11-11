import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  fetchGeocodeNominatim,
  fetchReverseGeocodePoint,
} from "services/geocoding";
import isNumber from "lodash/isNumber";

import Icon from "components/ui/icon";

import locationIcon from "assets/icons/location.svg?sprite";

import AsyncSelect from "react-select/async";

import "./styles.scss";

const customSelectStyles = {
  option: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
  }),
};

class PointSelector extends PureComponent {
  state = {
    loadingGeocode: false,
  };

  componentDidMount() {
    const { location, setSelectedPlaceName } = this.props;

    const adm0 = location && Number(location.adm0);
    const adm1 = location && Number(location.adm1);

    if (!isNaN(adm0) && !isNaN(adm1)) {
      fetchReverseGeocodePoint({ lat: adm0, lng: adm1 }).then((res) => {
        if (res && !!res.length) {
          setSelectedPlaceName(res[0].place_name);
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  handleInputChange = (option) => {
    const { onChange, setSelectedPlaceName } = this.props;

    if (option) {
      setSelectedPlaceName(option.label);

      if (onChange) {
        onChange({ adm0: option.value[1], adm1: option.value[0] });
      }
    }
  };

  loadOptions = async (input) => {
    return await fetchGeocodeNominatim(input).then((res) => {
      return res.map((o) => ({ label: o.place_name, value: o.center }));
    });
  };

  render() {
    const { selectedPlaceName } = this.props;

    return (
      <div>
        <div className="c-select">
          <AsyncSelect
            ref={(ref) => {
              this.selectRef = ref;
            }}
            loadOptions={this.loadOptions}
            onChange={this.handleInputChange}
            isClearable
            placeholder="Type to search location"
            styles={customSelectStyles}
          />
        </div>

        {!selectedPlaceName && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 550,
              width: "100%",
              margin: "25px 0 0",
              background: "url(/images/placeholder-map.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h3
              style={{
                color: "#393f44",
                fontSize: 26,
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              Search for a location within Africa to explore <br />
              climate change information
            </h3>
          </div>
        )}

        {selectedPlaceName && (
          <div className="selected-option">
            <Icon icon={locationIcon} className="location-icon" />
            <span className="location-name">{selectedPlaceName}</span>
          </div>
        )}
      </div>
    );
  }
}

export default PointSelector;

import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import { Row, Column } from "@erick-otenyo/hw-components";

import Dropdown from "components/ui/dropdown";
import Loader from "components/ui/loader";
import Icon from "components/ui/icon";
import Button from "components/ui/button";
import MapPicker from "./map";
import DecimalDegreeSearch from "./components/decimal-degrees";

import { getGadmLocationByLevel } from "utils/gadm";

import "./styles.scss";

class LocationPicker extends Component {
  getCountrySelectorData() {
    const { locationNames, adm0s } = this.props;

    return {
      value: locationNames?.adm0,
      options: adm0s?.length > 0 ? adm0s : [],
    };
  }

  getAdm1SelectorData() {
    const { locationNames, adm1s } = this.props;

    return {
      value: locationNames?.adm1,
      options: adm1s?.length > 0 ? adm1s : [],
    };
  }

  getAdm2SelectorData() {
    const { locationNames, adm2s } = this.props;

    return {
      value: locationNames?.adm2 || [],
      options: adm2s?.length > 0 ? adm2s : [],
    };
  }

  handleOnMapSelect = (selected) => {
    if (selected) {
      // point
      if (selected.lat && selected.lng) {
        const payload = {
          type: "point",
          adm0: selected.lat,
          adm1: selected.lng,
        };

        this.props.handleLocationChange(payload);
      } else {
        // area
        const payload = {
          type: "country",
          ...getGadmLocationByLevel(selected.properties),
        };

        this.props.handleLocationChange(payload);
      }
    }
  };

  handleOnLocationTypeChange = (locationType) => {
    this.props.handleLocationChange({ type: locationType });
  };

  render() {
    const {
      loading,
      handleLocationChange,
      location,
      selectorMeta: runtimeSelectorMeta,
      boundariesLayer,
    } = this.props;

    let selectorMeta;
    if (isEmpty(location)) {
      selectorMeta = {
        typeVerb: "country",
        typeName: "country",
      };
    } else {
      selectorMeta = runtimeSelectorMeta;
    }

    const isCountryPicker = location?.type === "country";
    const isPointPicker = location?.type === "point";

    const countrySelectorData = this.getCountrySelectorData();
    const regionData = this.getAdm1SelectorData();
    const subRegionData = this.getAdm2SelectorData();

    return (
      <div className="c-location-picker">
        {loading && <Loader className="loader" />}
        <Row className="sections-wrapper">
          <Column width={[1, 1 / 2]}>
            {isPointPicker && (
              <DecimalDegreeSearch
                location={location}
                handleOnSubmit={this.handleOnMapSelect}
              />
            )}
            {isCountryPicker && (
              <Dropdown
                theme="theme-dropdown-dark"
                className="country-picker-dropdown"
                placeholder={`Select ${selectorMeta.typeVerb}`}
                noItemsFound={`No ${selectorMeta.typeName} found`}
                noSelectedValue={`Select ${selectorMeta.typeName}`}
                value={countrySelectorData.value}
                options={countrySelectorData.options}
                onChange={(adm0) =>
                  handleLocationChange({ adm0: adm0 && adm0.value })
                }
                searchable
                disabled={loading}
                tooltip={{
                  text: `Choose the ${selectorMeta.typeName} you want to explore`,
                  delay: 1000,
                }}
                arrowPosition="left"
                clearable={isCountryPicker}
              />
            )}

            {isCountryPicker &&
              countrySelectorData.value &&
              countrySelectorData.options &&
              regionData.options &&
              regionData.options.length > 1 && (
                <Dropdown
                  theme="theme-dropdown-dark"
                  className="country-picker-dropdown"
                  placeholder="Select a region"
                  noItemsFound="No region found"
                  noSelectedValue="Select a region"
                  value={regionData.value}
                  options={regionData.options}
                  onChange={(adm1) =>
                    handleLocationChange({
                      adm0: location.adm0,
                      adm1: adm1 && adm1.value,
                    })
                  }
                  searchable
                  disabled={loading}
                  tooltip={{
                    text: "Choose the region you want to explore",
                    delay: 1000,
                  }}
                  arrowPosition="left"
                  clearable
                />
              )}
            {isCountryPicker &&
              regionData.value &&
              regionData.options &&
              subRegionData.options &&
              subRegionData.options.length > 1 && (
                <Dropdown
                  theme="theme-dropdown-dark"
                  className="country-picker-dropdown"
                  placeholder="Select a region"
                  noItemsFound="No region found"
                  noSelectedValue="Select a region"
                  value={subRegionData.value}
                  options={subRegionData.options}
                  onChange={(adm2) =>
                    handleLocationChange({
                      adm0: location.adm0,
                      adm1: location.adm1,
                      adm2: adm2 && adm2.value,
                    })
                  }
                  searchable
                  disabled={loading}
                  tooltip={{
                    text: "Choose the region you want to explore",
                    delay: 1000,
                  }}
                  arrowPosition="left"
                  clearable
                />
              )}
          </Column>
          <Column width={[1, 1 / 2]}>
            <MapPicker
              location={location}
              cursor="pointer"
              padding={25}
              onMapSelect={this.handleOnMapSelect}
              onLocationTypeChange={this.handleOnLocationTypeChange}
              boundariesLayer={boundariesLayer}
              isPointType={isPointPicker}
            />
          </Column>
        </Row>
      </div>
    );
  }
}

export default LocationPicker;

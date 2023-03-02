import React, { Component } from "react";
import { Row, Column } from "@erick-otenyo/hw-components";

import DatasetsProvider from "providers/datasets-provider";
import DatasetUpdateProvider from "providers/dataset-update-provider";
import LocationProvider from "providers/location-provider";
import GeostoreProvider from "providers/geostore-provider";
import CountryDataProvider from "providers/country-data-provider";

import LocationPicker from "./components/location-picker";

import "./styles.scss";

class ForecastLayout extends Component {
  render() {
    return (
      <div className="l-forecasts-page">
        <div className="c-forecasts-header">
          <Row>
            <Column>
              <LocationPicker />
            </Column>
          </Row>
        </div>
        <LocationProvider />
        <CountryDataProvider />
        <DatasetsProvider />
        <DatasetUpdateProvider />
        <GeostoreProvider />
      </div>
    );
  }
}

export default ForecastLayout;

import React, { Component } from "react";
import { Row, Column } from "@erick-otenyo/hw-components";

import MapExposure from "../map-exposure";
import Icon from "~/components/ui/icon/component";

import airportIcon from "assets/layer-icons/airport-1.svg?sprite";
import powerPlantIcon from "assets/layer-icons/electric-tower.svg?sprite";
import damIcon from "assets/layer-icons/dam.svg?sprite";

import "./styles.scss";

const DEFAULT_ANALYSIS_LAYERS = ["airports", "power_plants", "dams"];

class CapExposureAnalysis extends Component {
  componentDidMount() {
    const { features } = this.props;

    if (features) {
      this.refreshAalysis();
    }
  }

  refreshAalysis = () => {
    const {
      features,
      getAlertsGeostoreIds,
      getAlertsAnalysis,
      alertBbox,
    } = this.props;

    // getAlertsGeostoreIds(features);

    getAlertsAnalysis({ features: features, layers: DEFAULT_ANALYSIS_LAYERS });
  };

  render() {
    const {
      features,
      analysisLayers,
      alertBbox,
      areaLayer,
      analysisSummary,
    } = this.props;

    if (!features || !features.length) {
      return null;
    }

    return (
      <div className="map-exposure">
        <Row>
          <Column width={[1, 2 / 3]}>
            <MapExposure
              alertAreaLayer={areaLayer}
              layers={analysisLayers}
              bbox={alertBbox}
            />
          </Column>
          <Column width={[1, 1 / 3]}>
            {analysisSummary && (
              <Row>
                <Column>
                  <div className="summary-item">
                    <div className="summary-title">
                      <Icon icon={airportIcon} />
                      <div> Airports</div>
                    </div>
                    <div className="summary-value">
                      {analysisSummary.airports}
                    </div>
                  </div>
                </Column>
                <Column>
                  <div className="summary-item">
                    <div className="summary-title">
                      <Icon icon={powerPlantIcon} />
                      <div> Power Plants</div>
                    </div>
                    <div className="summary-value">
                      {analysisSummary.power_plants}
                    </div>
                  </div>
                </Column>
                <Column>
                  <div className="summary-item">
                    <div className="summary-title">
                      <Icon icon={damIcon} />
                      <div>Dams</div>
                    </div>
                    <div className="summary-value">{analysisSummary.dams}</div>
                  </div>
                </Column>
              </Row>
            )}
          </Column>
        </Row>
      </div>
    );
  }
}

export default CapExposureAnalysis;

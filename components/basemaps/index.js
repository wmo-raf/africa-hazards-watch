import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { trackEvent } from "utils/analytics";

import withTooltipEvt from "components/ui/with-tooltip-evt";
import { setModalMetaSettings } from "components/modals/meta/actions";
import { setAnalysisSettings } from "components/analysis/actions";
import * as mapActions from "components/map/actions";

import { getBasemapsProps } from "./selectors";
import BasemapsComponent from "./component";

const actions = {
  setModalMetaSettings,
  setAnalysisSettings,
  ...mapActions,
};

class BasemapsContainer extends React.Component {
  static propTypes = {
    activeLabels: PropTypes.object,
    basemaps: PropTypes.object,
    defaultPlanetBasemapsByCategory: PropTypes.object,
    defaultPlanetBasemap: PropTypes.string,
    labels: PropTypes.array,
    activeDatasets: PropTypes.array,
    activeBoundaries: PropTypes.object,
    setMapSettings: PropTypes.func.isRequired,
    setAnalysisSettings: PropTypes.func.isRequired,
    analysisSettings: PropTypes.object,
  };

  selectBasemap = ({ value } = {}) => {
    const { setMapSettings } = this.props;

    const basemapOptions = {
      value,
    };

    setMapSettings({ basemap: basemapOptions });
    trackEvent({
      category: "Map data",
      action: "basemap changed",
      label: value,
    });
  };

  selectLabels = (label) => {
    this.props.setMapSettings({ labels: label.value === "showLabels" });
    trackEvent({
      category: "Map data",
      action: "Label changed",
      label: label?.label,
    });
  };

  selectRoads = (roads) => {
    this.props.setMapSettings({ roads: roads.value });
    trackEvent("roadsChanged", {
      roads: roads.label,
    });
  };

  selectBoundaries = (item) => {
    const { activeDatasets, activeBoundaries } = this.props;
    const filteredLayers = activeBoundaries
      ? activeDatasets.filter((l) => l.dataset !== activeBoundaries.dataset)
      : activeDatasets;
    if (item.value !== "no-boundaries") {
      const newActiveDatasets = [
        {
          layers: item.layers,
          dataset: item.dataset,
          opacity: 1,
          visibility: true,
        },
        ...filteredLayers,
      ];
      this.props.setMapSettings({ datasets: newActiveDatasets });
    } else {
      this.props.setMapSettings({ datasets: filteredLayers });
    }
    trackEvent({
      category: "Map data",
      action: "Boundary changed",
      label: item?.dataset,
    });
  };

  handleOnLayerSettingToggle = (setting) => {
    const { setAnalysisSettings, analysisSettings } = this.props;

    if (analysisSettings && analysisSettings[setting] !== undefined) {
      setAnalysisSettings({ [setting]: !analysisSettings[setting] });
    }
  };

  render() {
    return (
      <BasemapsComponent
        {...this.props}
        selectBasemap={this.selectBasemap}
        selectLabels={this.selectLabels}
        selectBoundaries={this.selectBoundaries}
        selectRoads={this.selectRoads}
        onLayerSettingToggle={this.handleOnLayerSettingToggle}
      />
    );
  }
}

export default withTooltipEvt(
  connect(getBasemapsProps, actions)(BasemapsContainer)
);

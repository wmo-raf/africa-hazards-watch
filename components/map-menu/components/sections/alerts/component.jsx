import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { trackEvent } from "utils/analytics";
import bboxPolygon from "turf-bbox-polygon";
import turfIntersects from "@turf/boolean-intersects";
import turfBbox from "@turf/bbox";

import LayerToggle from "components/map/components/legend/components/layer-toggle";
import AlertsList from "./alert-list";
import SubnavMenu from "components/subnav-menu";
import AlertFilterButton from "./filter-button";

import "./styles.scss";

class Alerts extends PureComponent {
  static propTypes = {
    setMenuSettings: PropTypes.func,
    setMenuLoading: PropTypes.func,
    setMapSettings: PropTypes.func,
    loading: PropTypes.bool,
    isDesktop: PropTypes.bool,
    alertDataset: PropTypes.object,
  };

  state = {
    filter: { extent: "africa" },
  };

  handleChangeFilter = (option) => {
    this.setState({ filter: { ...this.state.filter, ...option } });
  };

  getAlertData = () => {
    const { filter } = this.state;

    let data = this.props.alertData;

    const { mapBounds } = this.props.mapSettings || {};

    if (filter.severity) {
      data = data.filter(
        (d) =>
          d.severity && d.severity.value && d.severity.value === filter.severity
      );
    }

    if (filter.urgency) {
      data = data.filter(
        (d) =>
          d.urgency && d.urgency.value && d.urgency.value === filter.urgency
      );
    }

    if (filter.certainty) {
      data = data.filter(
        (d) =>
          d.certainty &&
          d.certainty.value &&
          d.certainty.value === filter.certainty
      );
    }

    if (filter.extent && filter.extent === "map" && !!mapBounds.length) {
      const bbox = [
        mapBounds[0][0],
        mapBounds[0][1],
        mapBounds[1][0],
        mapBounds[1][1],
      ];

      const mapExtentPolygon = bboxPolygon(bbox);

      data = data.filter(
        (d) => d.feature && turfIntersects(mapExtentPolygon, d.feature)
      );
    }

    return data;
  };

  handleOnZoom = (feature) => {
    const { setMapSettings } = this.props;

    if (feature) {
      const bbox = turfBbox(feature);

      if (bbox) {
        setMapSettings({ bbox: bbox, canBound: true, padding: 20 });
      }
    }
  };

  render() {
    const {
      isDesktop,
      alertDataset,
      onToggleLayer,
      setModalMetaSettings,
      setMenuSettings,
      mapSettings,
    } = this.props;

    const alertData = this.getAlertData();

    const { filter } = this.state;

    const links = [
      {
        label: "Alerts List",
        active: true,
        onClick: () => {
          setMenuSettings({ alertType: "cap" });
          trackEvent({
            category: "Map menu",
            action: "Select alerts category",
            label: "Alerts",
          });
        },
      },
      {
        label: "Alert Analysis",
        active: false,
        onClick: () => {
          setMenuSettings({ alertType: "cap" });
          trackEvent({
            category: "Map menu",
            action: "Select alerts category",
            label: "Alerts",
          });
        },
      },
    ];

    const filterConfig = [
      {
        type: "select",
        label: "Severity",
        key: "severity",
        value: filter.severity,
        clearable: true,
        placeholder: "Select Severity",
        options: [
          { label: "Extreme", value: 4 },
          { label: "Severe", value: 3 },
          { label: "Moderate", value: 2 },
          { label: "Minor", value: 1 },
          { label: "Unknown", value: 0 },
        ],
      },
      {
        type: "select",
        label: "Urgency",
        key: "urgency",
        clearable: true,
        value: filter.urgency,
        placeholder: "Select Urgency",
        options: [
          { label: "Immediate", value: 4 },
          { label: "Expected", value: 3 },
          { label: "Future", value: 2 },
          { label: "Past", value: 1 },
          { label: "Unknown", value: 0 },
        ],
      },
      {
        type: "select",
        label: "Certainty",
        key: "certainty",
        clearable: true,
        value: filter.certainty,
        placeholder: "Select Certainty",
        options: [
          { label: "Observed", value: 4 },
          { label: "Likely", value: 3 },
          { label: "Possible", value: 2 },
          { label: "Unlikely", value: 1 },
          { label: "Unknown", value: 0 },
        ],
      },
      {
        type: "switch",
        label: "Limit data within:",
        key: "extent",
        value: { value: filter.extent },
        options: [
          { label: "Map Bounds", value: "map" },
          { label: "Entire Africa", value: "africa" },
        ],
      },
    ];

    return (
      <div className="c-alerts">
        <SubnavMenu
          links={links}
          className="alerts-menu"
          theme="theme-subnav-small-light"
        />
        <div className="alerts-wrapper">
          {alertDataset && (
            <div className="alerts-header">
              <LayerToggle
                tabIndex={0}
                className="dataset-toggle"
                data={{ ...alertDataset, dataset: alertDataset.id }}
                onToggle={onToggleLayer}
                onInfoClick={setModalMetaSettings}
                // category={datasetCategory}
              />
              {alertDataset && alertDataset.active && (
                <div className="alerts-filter">
                  <AlertFilterButton
                    filterConfig={filterConfig}
                    handleChangeFilter={this.handleChangeFilter}
                  />
                </div>
              )}
            </div>
          )}
          <div className="alerts-content">
            <div className="row">
              {/* {alertDataset && alertDataset.active && alertData && (
                <AlertsList data={alertData} onZoomTo={this.handleOnZoom} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alerts;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import WebMercatorViewport from "viewport-mercator-project";
import Checkbox from "components/ui/checkbox";

import Button from "components/ui/button";

import MapPreview from "./preview-map";

import hwLogo from "assets/logos/logo.png?webp";

import "./styles.scss";

class MapPrint extends PureComponent {
  state = { previewMapLoaded: false, mounted: false, title: false };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleOnPrint = () => {
    try {
      document.execCommand("print", false, null);
    } catch (e) {
      window.print();
    }
  };

  onMapPreviewLoad = (map) => {
    this.setState({ previewMapLoaded: true });
  };

  handleOnOptionToggle = (option) => {
    this.setState({ [option]: !this.state[option] });
  };

  render() {
    const { onCancel, mapPrintConfig } = this.props;
    const { mapStyle, viewport, bounds } = mapPrintConfig || {};
    const { previewMapLoaded, mounted, title } = this.state;

    let mapViewport = { ...viewport } || {};

    if (mounted && mapStyle && viewport && bounds) {
      const v = {
        width: this.mapContainer.offsetWidth,
        height: this.mapContainer.offsetHeight,
        ...viewport,
      };

      // try to fit parent map to new size
      const { longitude, latitude, zoom } =
        new WebMercatorViewport(v)?.fitBounds(bounds) || {};

      mapViewport = { ...viewport, longitude, latitude, zoom };
    }

    return (
      <section className="c-print-preview">
        <div className="report">
          <div className="full-height">
            <div className="content-controls-container">
              <div className="c-control">
                <Checkbox
                  id="title"
                  value={title}
                  onChange={() => {
                    this.handleOnOptionToggle("title");
                  }}
                />
                <label htmlFor="title">Add Map Title</label>
              </div>
            </div>
            <div className="print-content">
              <div className="page-header">
                <div className="branding">
                  <img
                    className="brand-logo"
                    src={hwLogo}
                    alt="Hazards Watch"
                  />
                </div>
                {title && (
                  <div className="map-title" contentEditable>
                    Click to Edit Your Map Title
                  </div>
                )}
              </div>

              <div
                className="map-preview-container"
                ref={(r) => {
                  this.mapContainer = r;
                }}
              >
                {mounted && (
                  <MapPreview
                    mapStyle={mapStyle}
                    viewport={mapViewport}
                    onLoad={this.onMapPreviewLoad}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="print-config">
            <div className="container">
              <div className="print-controls">
                <Button
                  className="cancel-btn"
                  theme="theme-button-light"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="print-btn"
                  disabled={!previewMapLoaded}
                  onClick={this.handleOnPrint}
                >
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MapPrint.propTypes = {
  onCancel: PropTypes.func,
  mapPrintConfig: PropTypes.object,
};

MapPrint.defaultProps = {
  onCancel: () => ({}),
};

export default MapPrint;

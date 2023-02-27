import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import cx from "classnames";
import ContentLoader from "react-content-loader";
import WebMercatorViewport from "viewport-mercator-project";
import { TRANSITION_EVENTS } from "react-map-gl";

import { PluginMapboxGl } from "layer-manager";
import { LayerManager, Layer } from "layer-manager/dist/components";

import Map from "components/ui/map";

import BASEMAPS from "components/map/basemaps";

import "./styles.scss";

const DEFAULT_VIEWPORT = {
  zoom: 2,
  lat: 0,
  lng: 0,
};

const { basicWithLabels } = BASEMAPS;

const basemap = {
  ...basicWithLabels,
};

class MapGeostore extends Component {
  static propTypes = {
    className: PropTypes.string,
    padding: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    cursor: PropTypes.string,
    small: PropTypes.bool,
    location: PropTypes.object,
  };

  static defaultProps = {
    padding: 25,
    height: 140,
    width: 140,
    cursor: "default",
  };

  state = {
    loading: true,
    error: false,
    viewport: DEFAULT_VIEWPORT,
    geostore: null,
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;

    this.fitBounds();
  }

  componentDidUpdate(prevProps, prevState) {
    const { alertBbox } = this.props;
    const { alertBbox: prevAlertBbox } = prevProps;

    if (!isEmpty(alertBbox) && !isEqual(alertBbox, prevAlertBbox)) {
      this.fitBounds();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLoad = ({ map }) => {
    if (map) {
      map.on("render", () => {
        if (this.state.loading) {
          if (map.areTilesLoaded() && this.mounted) {
            this.setState({ loading: false });
          }
        } else {
          map.off("render");
        }
      });

      this.fitBounds();
    }
  };

  fitBounds = () => {
    const { viewport } = this.state;
    const { alertBbox } = this.props;

    if (alertBbox && this.mounted) {
      const v = {
        width: this.mapContainer.offsetWidth,
        height: this.mapContainer.offsetHeight,
        ...viewport,
      };

      const { longitude, latitude, zoom } =
        new WebMercatorViewport(v)?.fitBounds(
          [
            [alertBbox[0], alertBbox[1]],
            [alertBbox[2], alertBbox[3]],
          ],
          { padding: this.props.padding }
        ) || {};

      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom,
          transitionDuration: 0,
          transitionInterruption: TRANSITION_EVENTS.UPDATE,
        },
      });
    }
  };

  render() {
    const {
      className,
      width,
      height,
      cursor,
      small,
      alertGeojson,
      severityColor,
    } = this.props;
    const { loading, viewport, error } = this.state;

    return (
      <div
        id="recent-image-map"
        className={cx("c-recent-image-map", className, { small })}
        ref={(r) => {
          this.mapContainer = r;
        }}
      >
        {loading && (
          <ContentLoader
            width={width}
            height={height}
            style={{ width: "100%" }}
          >
            <rect x="0" y="0" width={width} height="100%" />
          </ContentLoader>
        )}
        {error && !loading && (
          <p className="error-msg">we had trouble finding a recent image</p>
        )}
        {basemap && (
          <Map
            mapStyle={basemap.mapStyle}
            viewport={viewport}
            attributionControl={false}
            onLoad={this.onLoad}
            dragPan={false}
            dragRotate={false}
            scrollZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            touchRotate={false}
            keyboard={false}
            getCursor={() => cursor}
          >
            {(map) => (
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {alertGeojson && (
                  <Layer
                    id={alertGeojson.id}
                    name="Geojson"
                    type="geojson"
                    source={{
                      data: alertGeojson,
                      type: "geojson",
                    }}
                    render={{
                      layers: [
                        {
                          type: "fill",
                          paint: {
                            "fill-color": severityColor,
                          },
                        },
                        {
                          type: "line",
                          paint: {
                            "line-color": "#000",
                            "line-width": 1.5,
                          },
                        },
                      ],
                    }}
                    zIndex={1060}
                  />
                )}
              </LayerManager>
            )}
          </Map>
        )}
      </div>
    );
  }
}

export default MapGeostore;

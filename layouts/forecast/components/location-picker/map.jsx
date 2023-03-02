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

import { getGeostore } from "services/geostore";

import Map from "components/ui/map";
import Popup from "./components/popup";

import BASEMAPS from "components/map/basemaps";
import { validateLatLng } from "utils/geoms";

const DEFAULT_VIEWPORT = {
  zoom: 2,
  lat: 0,
  lng: 0,
};

const { defaultWithLabels } = BASEMAPS;

const basemap = {
  ...defaultWithLabels,
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
    boundaryFeature: null,
    latitude: null,
    longitude: null,
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    const { location } = this.props;
    if (location && location.adm0) {
      this.handleGetGeostore();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    if (location && !isEqual(location, prevLocation)) {
      this.handleGetGeostore();

      const pointFeature = this.getPointFeature();

      if (pointFeature) {
        this.fitBounds(pointFeature);
      }
    }

    const { geostore } = this.state;
    const { geostore: prevGeostore } = prevState;

    if (!isEmpty(geostore) && !isEqual(geostore, prevGeostore)) {
      this.fitBounds();
    }
  }

  getPointFeature = () => {
    const { location } = this.props;

    const { type: locationType, adm0, adm1 } = location;

    if (locationType && locationType === "point" && adm0 && adm1) {
      const lat = parseFloat(adm0);
      const lng = parseFloat(adm1);

      if (validateLatLng(lat, lng)) {
        return {
          latLng: { lat, lng },
          geojson: {
            type: "FeatureCollection",
            latLng: { lat, lng },
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                  properties: {},
                },
              },
            ],
          },
        };
      }
    }

    return null;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleGetGeostore = async () => {
    if (this.mounted) {
      this.setState({ error: false, geostore: null });
      try {
        if (this.mounted) {
          const geostore = await getGeostore(this.props.location);
          this.setState({
            geostore,
            boundaryFeature: null,
            latitude: null,
            longitude: null,
          });
        }
      } catch (error) {
        if (this.mounted) {
          this.setState({ error: true });
        }
      }
    }
  };

  onLoad = ({ map }) => {
    if (map) {
      this.map = map;

      map.on("render", () => {
        if (this.state.loading) {
          if (map.areTilesLoaded() && this.mounted) {
            this.setState({ loading: false });
          }
        } else {
          map.off("render");
        }
      });
    }
  };

  fitBounds = (feature) => {
    const { viewport, geostore } = this.state;
    const { bbox: geostoreBbox } = geostore || {};

    const v = {
      width: this.mapContainer.offsetWidth,
      height: this.mapContainer.offsetHeight,
      ...viewport,
    };

    let lat, lng, zoom;

    if (geostoreBbox) {
      const { longitude, latitude, zoom: gZoom } =
        new WebMercatorViewport(v)?.fitBounds(
          [
            [geostoreBbox[0], geostoreBbox[1]],
            [geostoreBbox[2], geostoreBbox[3]],
          ],
          { padding: this.props.padding }
        ) || {};

      lat = latitude;
      lng = longitude;
      zoom = gZoom;
    } else if (feature) {
      lat = feature.latLng.lat;
      lng = feature.latLng.lng;
      zoom = 3;
    }

    if (this.mounted) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude: lng,
          latitude: lat,
          zoom,
          transitionDuration: 0,
          transitionInterruption: TRANSITION_EVENTS.UPDATE,
        },
      });
    }
  };

  onMapClick = (e) => {
    const {
      features,
      lngLat: [lng, lat],
    } = e;

    // quick fix to capture map canvas only clicks and not popup button
    // https://github.com/alex3165/react-mapbox-gl/issues/725
    const { target } = e;
    const canvas = this.map.getCanvas();
    const isMapClick = target === canvas;

    if (isMapClick) {
      const boundaryFeature =
        features && features.find((f) => f.source === "political-boundaries");

      this.setState({ longitude: lng, latitude: lat, boundaryFeature });
    }
  };

  handleOnPopupClose = () => {
    this.setState({ longitude: null, latitude: null, boundaryFeature: null });
  };

  onClickAction = () => {
    const { boundaryFeature, latitude, longitude } = this.state;
    const { onMapSelect, isPointType } = this.props;

    if (isPointType && latitude && longitude) {
      onMapSelect({ lat: latitude, lng: longitude });
    } else {
      if (boundaryFeature) {
        onMapSelect(boundaryFeature);
      }
    }
  };

  onLocationTypeChange = (locationType) => {
    const { onLocationTypeChange } = this.props;

    if (onLocationTypeChange) {
      onLocationTypeChange(locationType);
    }
  };

  render() {
    const {
      className,
      width,
      height,
      cursor,
      small,
      boundariesLayer,
      location,
      isPointType,
    } = this.props;
    const {
      loading,
      viewport,
      geostore,
      error,
      longitude,
      latitude,
      boundaryFeature,
    } = this.state;

    let boundariesLayerConfig = boundariesLayer && boundariesLayer.layerConfig;

    if (boundariesLayer && boundariesLayer.config) {
      boundariesLayerConfig = boundariesLayer.config;
    }

    const interactiveLayerIds = [];

    if (boundariesLayer) {
      interactiveLayerIds.push(boundariesLayer.id);
    }

    const { type: locationType } = location;

    const pointFeature = this.getPointFeature();

    return (
      <div
        id="map-picker"
        className={cx("c-map-picker no-pointer-events", className, { small })}
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
        {basemap && (
          <Map
            mapStyle={basemap.mapStyle}
            viewport={viewport}
            attributionControl={false}
            onLoad={this.onLoad}
            dragRotate={false}
            getCursor={() => cursor}
            onClick={this.onMapClick}
          >
            {(map) => (
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {geostore && (
                  <Layer
                    id={geostore.id}
                    name="Geojson"
                    type="geojson"
                    source={{
                      data: geostore.geojson,
                      type: "geojson",
                    }}
                    render={{
                      layers: [
                        {
                          type: "fill",
                          paint: {
                            "fill-color": "transparent",
                          },
                        },
                        {
                          type: "line",
                          paint: {
                            "line-color": "#a4dbfd",
                            "line-width": 3,
                            "line-offset": 2,
                          },
                        },
                        {
                          type: "line",
                          paint: {
                            "line-color": "#000",
                            "line-width": 2,
                          },
                        },
                      ],
                    }}
                    zIndex={1060}
                  />
                )}

                {pointFeature && (
                  <Layer
                    id={"selected-point"}
                    name="Geojson Point"
                    type="geojson"
                    source={{
                      data: pointFeature.geojson,
                      type: "geojson",
                    }}
                    render={{
                      layers: [
                        {
                          type: "circle",
                          paint: {
                            "circle-color": "#fff",
                            "circle-radius": 8,
                            "circle-stroke-width": 4,
                            "circle-stroke-color": "#4e8ecb",
                          },
                          metadata: {
                            position: "top",
                          },
                        },
                      ],
                    }}
                    zIndex={1060}
                  />
                )}

                {boundariesLayer && (
                  <Layer
                    id={boundariesLayer.id}
                    {...boundariesLayer}
                    {...boundariesLayerConfig}
                  />
                )}

                {longitude && latitude && (
                  <Popup
                    showPopup
                    longitude={longitude}
                    latitude={latitude}
                    onClickAction={this.onClickAction}
                    boundaryFeature={boundaryFeature}
                    onClose={this.handleOnPopupClose}
                    isPointType={isPointType}
                  />
                )}
              </LayerManager>
            )}
          </Map>
        )}
        <div className="location-type-control">
          <div
            className={cx("location-option", {
              active: locationType && locationType === "point",
            })}
            onClick={() => {
              this.onLocationTypeChange("point");
            }}
          >
            Use Point
          </div>
          <div
            className={cx("location-option", {
              active: locationType && locationType === "country",
            })}
            onClick={() => this.onLocationTypeChange("country")}
          >
            Use Area
          </div>
        </div>
      </div>
    );
  }
}

export default MapGeostore;

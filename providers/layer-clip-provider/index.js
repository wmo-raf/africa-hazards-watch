import { PureComponent } from "react";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import uniq from "lodash/uniq";
import isEmpty from "lodash/isEmpty";
// import { stringify } from "wkt";

import { setMapSettings } from "components/map/actions";
import { getProps } from "./selectors";

class LayerClipProvider extends PureComponent {
  componentDidMount() {
    const { location, geostore } = this.props;
    if (
      location &&
      location.type === "country" &&
      geostore &&
      geostore.geojson
    ) {
      this.updateMapSettings();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      activeDatasets,
      layers,
      location,
      setMapSettings,
      geostore,
      clipToBoundary,
    } = this.props;

    const {
      layers: prevLayers,
      location: prevLocation,
      geostore: prevGeostore,
      clipToBoundary: prevClipToBoundary,
    } = prevProps;

    const datasets = uniq(activeDatasets);
    const prevDatasets = uniq(prevProps.activeDatasets);

    if (
      !isEqual(location, prevLocation) ||
      datasets.length != prevDatasets.length ||
      clipToBoundary != prevClipToBoundary ||
      !isEqual(geostore, prevGeostore)
    ) {
      if (clipToBoundary && !isEmpty(geostore)) {
        if (location && location.type === "country") {
          this.updateMapSettings();
        }
      } else {
        this.updateMapSettings(true);
      }

      if (location && location.type === "africa") {
        this.updateMapSettings(true);
      }
    }
  }

  updateMapSettings(clear) {
    const {
      activeDatasets,
      layers,
      location,
      setMapSettings,
      isDashboard,
      geostore,
    } = this.props;

    if (!isDashboard) {
      const datasets = uniq(activeDatasets);

      setMapSettings({
        datasets: datasets.map((d) => {
          const dataset = { ...d };

          layers.forEach((l) => {
            if (
              l.layerConfig &&
              l.layerConfig.canClipToGeom &&
              d.layers.includes(l.id)
            ) {
              let clip_feature = "";

              if (
                !clear &&
                !isEmpty(geostore) &&
                geostore.info &&
                geostore.info.fid
              ) {
                clip_feature = geostore.info.fid;
              }

              dataset.params = {
                ...dataset.params,
                clip_feature: clear ? "" : clip_feature,
              };
            }
          });
          return dataset;
        }),
      });
    }
  }

  render() {
    return null;
  }
}

export default connect(getProps, {
  setMapSettings,
})(LayerClipProvider);

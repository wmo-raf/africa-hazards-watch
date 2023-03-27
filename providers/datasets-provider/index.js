import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import reducerRegistry from "redux/registry";
import isEqual from "lodash/isEqual";
import uniq from "lodash/uniq";
import isEmpty from "lodash/isEmpty";

import * as ownActions from "./actions";
import reducers, { initialState } from "./reducers";
import { getDatasetProps } from "./selectors";
import { setMapSettings } from "components/map/actions";
import LayerUpdate from "./Update";

const actions = {
  ...ownActions,
  setMapSettings,
};

class DatasetsProvider extends PureComponent {
  componentDidMount() {
    const { fetchDatasets, activeDatasets, location, geostore } = this.props;

    fetchDatasets(activeDatasets);

    if (geostore && geostore.geojson) {
      this.updateMapSettings();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeDatasets, location, geostore, clipToGeostore } = this.props;

    const {
      layers: prevLayers,
      location: prevLocation,
      geostore: prevGeostore,
      clipToGeostore: prevClipToGeostore,
    } = prevProps;

    const datasets = uniq(activeDatasets);
    const prevDatasets = uniq(prevProps.activeDatasets);

    if (
      !isEqual(location, prevLocation) ||
      datasets.length != prevDatasets.length ||
      clipToGeostore != prevClipToGeostore ||
      !isEqual(geostore, prevGeostore)
    ) {
      if (clipToGeostore && !isEmpty(geostore)) {
        this.updateMapSettings();
      } else {
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

      const mapDatasets = datasets.map((d) => {
        const dataset = { ...d };

        layers.forEach((l) => {
          if (
            l.layerConfig &&
            l.layerConfig.canClipToGeom &&
            dataset.layers.includes(l.id)
          ) {
            let geojson_feature_id = "";

            if (!clear && !isEmpty(geostore) && geostore.id) {
              geojson_feature_id = geostore.id;
            }

            dataset.params = {
              ...dataset.params,
              geojson_feature_id: clear ? "" : geojson_feature_id,
            };
          }
        });

        return dataset;
      });

      setMapSettings({
        datasets: mapDatasets,
      });
    }
  }

  getLayerUpdateComponents = () => {
    const { updateProviders } = this.props;
    return updateProviders.map((t) => (
      <LayerUpdate key={t.layer} {...t} {...this.props} />
    ));
  };

  render() {
    return this.getLayerUpdateComponents();
  }
}

DatasetsProvider.propTypes = {
  fetchDatasets: PropTypes.func.isRequired,
  activeDatasets: PropTypes.array,
};

reducerRegistry.registerModule("datasets", {
  actions,
  reducers,
  initialState,
});

export default connect(getDatasetProps, actions)(DatasetsProvider);

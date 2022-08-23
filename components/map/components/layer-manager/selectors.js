import { createStructuredSelector } from "reselect";

import {
  getActiveLayersWithDates,
  getDrawing,
  getBasemap,
  selectGeostore,
  getActiveDatasetsFromState,
} from "components/map/selectors";

export const selectLocation = (state) =>
  state.location && state.location.payload;
const selectDatasets = (state) => state.datasets && state.datasets.data;

export const getLayerManagerProps = createStructuredSelector({
  allDatasets: selectDatasets,
  activeDatasets: getActiveDatasetsFromState,
  layers: getActiveLayersWithDates,
  geostore: selectGeostore,
  basemap: getBasemap,
  drawing: getDrawing,
});

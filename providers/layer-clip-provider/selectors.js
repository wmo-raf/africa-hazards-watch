import { createStructuredSelector } from "reselect";

import {
  getActiveLayersWithDates,
  selectGeostore,
  getActiveDatasetsFromState,
} from "components/map/selectors";

export const selectLocation = (state) =>
  state.location && state.location.payload;

export const selectClipToBoundary = (state) =>
  state.analysis?.settings?.clipToBoundary;

export const getProps = createStructuredSelector({
  activeDatasets: getActiveDatasetsFromState,
  layers: getActiveLayersWithDates,
  geostore: selectGeostore,
  location: selectLocation,
  clipToBoundary: selectClipToBoundary,
});

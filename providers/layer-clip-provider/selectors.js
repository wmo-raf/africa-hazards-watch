import { createStructuredSelector } from "reselect";

import {
  getActiveLayers,
  selectGeostore,
  getActiveDatasetsFromState,
} from "components/map/selectors";

export const selectLocation = (state) =>
  state.location && state.location.payload;

export const selectClipToBoundary = (state) =>
  state.analysis?.settings?.clipToBoundary;

export const getProps = createStructuredSelector({
  activeDatasets: getActiveDatasetsFromState,
  layers: getActiveLayers,
  geostore: selectGeostore,
  location: selectLocation,
  clipToBoundary: selectClipToBoundary,
});

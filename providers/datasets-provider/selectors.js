import { createStructuredSelector, createSelector } from "reselect";
import {
  getActiveLayers,
  selectGeostore,
  getActiveDatasetsFromState,
} from "components/map/selectors";

export const selectLocation = (state) =>
  state.location && state.location.payload;

export const selectClipToGeostore = (state) =>
  state.map?.settings?.clipToGeostore;

import { layersUpdateProviders } from "./datasets";

export const getUpdateProviders = createSelector(
  [getActiveLayers, getActiveDatasetsFromState],
  (activeLayers, activeDatasets) => {
    const updateProviders = layersUpdateProviders.filter((p) =>
      activeLayers.find((l) => l.id === p.layer)
    );

    return updateProviders;
  }
);

export const getDatasetProps = createStructuredSelector({
  activeDatasets: getActiveDatasetsFromState,
  updateProviders: getUpdateProviders,
  layers: getActiveLayers,
  geostore: selectGeostore,
  location: selectLocation,
  clipToGeostore: selectClipToGeostore,
});

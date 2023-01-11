import { createStructuredSelector, createSelector } from "reselect";

import {
  getActiveLayers,
  getActiveDatasetsFromState,
} from "components/map/selectors";

import allUpdateProviders from "./manifest";

export const getUpdateProviders = createSelector(
  [getActiveLayers, getActiveDatasetsFromState],
  (activeLayers, activeDatasets) => {
    const updateProviders = Object.values(allUpdateProviders).filter((p) =>
      activeLayers.find((l) => l.id === p.layer)
    );

    return updateProviders;
  }
);

export const getDatasetUpdateProps = createStructuredSelector({
  updateProviders: getUpdateProviders,
  activeDatasets: getActiveDatasetsFromState,
});

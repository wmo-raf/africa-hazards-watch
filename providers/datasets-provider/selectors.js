import { createStructuredSelector, createSelector } from "reselect";
import {
  getActiveLayers,
  getActiveDatasetsFromState,
} from "components/map/selectors";

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
});

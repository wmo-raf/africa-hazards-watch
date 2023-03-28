import { createAction, createThunkAction } from "redux/actions";

import allDatasets from "./datasets";

import { setMapSettings } from "components/map/actions";

export const setDatasetsLoading = createAction("setDatasetsLoading");
export const setDatasets = createAction("setDatasets");
export const updateDatasets = createAction("updateDatasets");
export const removeDataset = createAction("removeDataset");

export const setLayerUpdatingStatus = createAction("setLayerUpdatingStatus");
export const setLayerLoadingStatus = createAction("setLayerLoadingStatus");
export const setGeojsonData = createAction("setGeojsonData");
export const setTimestamps = createAction("setTimestamps");

export const fetchDatasets = createThunkAction(
  "fetchDatasets",
  (activeDatasets) => (dispatch, getState) => {
    const currentActiveDatasets = [...activeDatasets];

    dispatch(setDatasetsLoading({ loading: true, error: false }));

    const initialVisibleDatasets = allDatasets.filter((d) => d.initialVisible);

    const { query } = getState().location;

    const hasDatasetsInUrlState =
      query && query.map && query.map.datasets && !!query.map.datasets.length;

    // set default visible datasets when no datasets in map url state
    if (!hasDatasetsInUrlState && !!initialVisibleDatasets.length) {
      const newDatasets = [...currentActiveDatasets].concat(
        initialVisibleDatasets.reduce((all, dataset) => {
          const config = {
            dataset: dataset.id,
            layers: dataset.layers.map((l) => l.id),
            opacity: 1,
            visibility: true,
          };
          all.push(config);
          return all;
        }, [])
      );
      // set new active Datasets
      dispatch(setMapSettings({ datasets: newDatasets }));
    }

    dispatch(setDatasets(allDatasets));
  }
);

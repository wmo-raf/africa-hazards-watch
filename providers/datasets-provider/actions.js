import { all, spread } from "axios";
import { createAction, createThunkAction } from "redux/actions";
import isFunction from "lodash/isFunction";

import { defined } from "utils/core";

import { localDatasets, asyncDatasets } from "./datasets/index";

import { setMapSettings } from "components/map/actions";

export const setDatasetsLoading = createAction("setDatasetsLoading");
export const setDatasets = createAction("setDatasets");
export const updateDatasets = createAction("updateDatasets");

export const fetchDatasets = createThunkAction(
  "fetchDatasets",
  (activeDatasets) => (dispatch, getState) => {
    const currentActiveDatasets = [...activeDatasets];

    dispatch(setDatasetsLoading({ loading: true, error: false }));

    // custom async layers
    const asyncLayersRequests = asyncDatasets.reduce((all, dataset) => {
      // datasets with getLayers Function. getLayers should return a promise of layers for the specific dataset
      if (defined(dataset.getLayers && isFunction(dataset.getLayers))) {
        all.push(
          dataset.getLayers().then((layers) => {
            return { ...dataset, layers: layers };
          })
        );
      }
      return all;
    }, []);

    all([...asyncLayersRequests])
      .then(
        spread((...asyncDatasets) => {
          const asyncDatasetsWithLayers = asyncDatasets
            .filter((d) => defined(d.layers) && !!d.layers.length)
            .map((d) => {
              delete d.getLayers;
              return d;
            });
          const allDatasets = localDatasets.concat(asyncDatasetsWithLayers);

          const initialVisibleDatasets = allDatasets.filter(
            (d) => d.initialVisible
          );

          const { query } = getState().location;

          const hasDatasetsInUrlState =
            query &&
            query.map &&
            query.map.datasets &&
            !!query.map.datasets.length;

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
        })
      )
      .catch((error) => {
        dispatch(setDatasetsLoading({ loading: false, error: true }));
      });
  }
);

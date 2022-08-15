import { all, spread } from "axios";
import { createAction, createThunkAction } from "redux/actions";
import isFunction from "lodash/isFunction";

import { defined } from "utils/core";

import { localDatasets, asyncDatasets } from "./datasets/index";
import { getApiDatasets } from "services/datasets";

export const setDatasetsLoading = createAction("setDatasetsLoading");
export const setDatasets = createAction("setDatasets");

export const fetchDatasets = createThunkAction(
  "fetchDatasets",
  () => (dispatch) => {
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

    console.log(localDatasets);

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

          dispatch(setDatasets(allDatasets));
        })
      )
      .catch((error) => {
        console.log(error);
        dispatch(setDatasetsLoading({ loading: false, error: true }));
      });
  }
);

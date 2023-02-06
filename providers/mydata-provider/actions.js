import { createAction, createThunkAction } from "redux/actions";

import { getMyDatasets, getMyDataset } from "services/mydata";

import { updateDatasets } from "providers/datasets-provider/actions";

export const setMyDataLoading = createAction("setMyDataLoading");
export const setMyDatasets = createAction("setMyDatasets");
export const setMyDataset = createAction("setMyDataset");
export const removeMyDataset = createAction("removeMyDataset");
export const setMyDataSettings = createAction("setMyDataSettings");
export const setMyDataUploads = createAction("setMyDataUploads");
export const setMyDataRasterFiles = createAction("setMyDataRasterFiles");
export const updateMyDataUploads = createAction("updateMyDataUploads");
export const setMyDataUploading = createAction("setMyDataUploading");
export const removeMyDataUploads = createAction("removeMyDataUploads");

export const getMyDatasetsProvider = createThunkAction(
  "getMyDatasetsProvider",
  () => (dispatch) => {
    dispatch(setMyDataLoading({ loading: true, error: false }));

    getMyDatasets()
      .then((myDatasets) => {
        if (myDatasets && !!myDatasets.length) {
          dispatch(setMyDatasets(myDatasets));

          const datasets = myDatasets.map((d) => ({
            ...d.mapDataset,
            userDataset: true,
          }));

          dispatch(updateDatasets(datasets));
        }
        dispatch(setMyDataLoading({ loading: false, error: false }));
      })
      .catch((error) => {
        dispatch(
          setMyDataLoading({
            loading: false,
            error: error.response && error.response.status,
          })
        );
      });
  }
);

export const getMyDatasetProvider = createThunkAction(
  "getMyDatasetProvider",
  (id) => (dispatch) => {
    dispatch(setMyDataLoading({ loading: true, error: false }));

    getMyDataset(id)
      .then((myDataset) => {
        dispatch(
          setMyDataset({
            ...myDataset,
          })
        );
        dispatch(setMyDataLoading({ loading: false, error: false }));
      })
      .catch((error) => {
        dispatch(
          setMyDataLoading({
            loading: false,
            error: error.response && error.response.status,
          })
        );
      });
  }
);

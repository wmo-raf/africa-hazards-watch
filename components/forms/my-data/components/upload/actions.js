import { createAction, createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import { trackEvent } from "utils/analytics";

import {
  uploadDatasetFile,
  getMyDatasetUploads,
  deleteDatasetUploadFile,
  publishMyDatasetRaster,
  getMyDatasetRasterFiles,
} from "services/mydata";

import {
  setMyDataLoading,
  setMyDataUploads,
  setMyDataUploading,
  updateMyDataUploads,
  removeMyDataUploads,
  setMyDataRasterFiles,
} from "providers/mydata-provider/actions";
import { updateDatasets } from "providers/datasets-provider/actions";
import { setTimestamps } from "providers/dataset-update-provider/actions";
import { setMapSettings } from "components/map/actions";
import { setMyDataModalSettings } from "components/modals/my-data/actions";

export const getMyDataUploads = createThunkAction(
  "getMyDataUploads",
  (datasetId) => (dispatch) => {
    dispatch(setMyDataLoading({ loading: true, error: false }));

    getMyDatasetUploads(datasetId)
      .then((uploads) => {
        if (uploads && !!uploads.length) {
          const myUploads = uploads.reduce((all, item) => {
            if (all[item.dataset_id]) {
              all[item.dataset_id].push(item);
            } else {
              all[item.dataset_id] = [item];
            }

            return all;
          }, {});

          dispatch(setMyDataUploads(myUploads));
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

const getErrorMessage = (error, file) => {
  const fileName = file.name && file.name.split(".");
  const fileType = fileName[fileName.length - 1];

  const title =
    error.response && error.response.status >= 500
      ? "The service can't be reached"
      : `Invalid .${fileType} file format`;
  const desc =
    (error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0].detail) ||
    error.message ||
    "It’s quite likely because our service is down, but can you also please check your Internet connection?";

  return {
    title,
    desc,
  };
};

export const uploadRaster = createThunkAction(
  "uploadRaster",
  ({ file, dataset_id, onCheckUpload, onCheckDownload, token }) => (
    dispatch
  ) => {
    dispatch(
      setMyDataUploading({
        loading: true,
        error: "",
        errorMessage: "",
      })
    );

    uploadDatasetFile(file, dataset_id, onCheckUpload, onCheckDownload, token)
      .then((rasterUpload) => {
        dispatch(updateMyDataUploads(rasterUpload));

        dispatch(
          setMyDataUploading({
            loading: false,
            error: "",
            errorMessage: "",
          })
        );

        trackEvent({
          category: "User Dataset",
          action: "Upload raster file",
          label: dataset_id,
        });
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error, shape);

        if (errorMessage.title !== "cancel upload shape") {
          dispatch(
            setMyDataUploading({
              loading: false,
              error: errorMessage.title,
              errorMessage: errorMessage.desc,
            })
          );
          trackEvent({
            category: "User Dataset",
            action: "Upload raster file",
            label: `Failed: ${errorMessage.title}`,
          });
        }
      });
  }
);

export const removeUpload = createThunkAction(
  "removeUpload",
  (uploadId) => (dispatch) => {
    dispatch(
      setMyDataUploading({
        loading: true,
        error: "",
        errorMessage: "",
      })
    );

    deleteDatasetUploadFile(uploadId)
      .then((rasterUpload) => {
        dispatch(removeMyDataUploads(rasterUpload));

        dispatch(
          setMyDataUploading({
            loading: false,
            error: "",
            errorMessage: "",
          })
        );

        trackEvent({
          category: "User Dataset",
          action: "Delete raster file",
          label: rasterUpload.dataset_id,
        });
      })
      .catch((error) => {
        dispatch(
          setMyDataUploading({
            loading: false,
            error: "",
            errorMessage: "",
          })
        );
      });
  }
);

export const publishRaster = createThunkAction(
  "publishRaster",
  ({ upload_id, timestamps, activeDataset }) => (dispatch, getState) => {
    const {
      map: {
        settings: { datasets: allActiveDatasets },
      },
    } = getState();

    const postData = { upload_id, timestamps };

    return publishMyDatasetRaster(postData)
      .then((response) => {
        const { datasetDates, publishedRasters } = response;

        const { upload } = publishedRasters;

        // remove upload from state
        dispatch(removeMyDataUploads(upload));

        // set layer timestamps
        const { layer } = activeDataset;

        dispatch(setTimestamps({ [layer]: datasetDates }));

        // set visible time
        const newParams = { time: datasetDates[datasetDates.length - 1] };

        // mark as user dataset
        const dataset = { ...activeDataset, userDataset: true };

        // update time param
        dataset.layers = dataset.layers.map((l) => ({
          ...l,
          params: { ...l.params, ...newParams },
        }));

        // update dataset
        dispatch(updateDatasets([dataset]));

        // add dataset to map
        const isVisible = allActiveDatasets.find(
          (d) => d.dataset === activeDataset.id
        );

        if (!isVisible) {
          let newActiveDatasets = [...allActiveDatasets];
          newActiveDatasets = [
            {
              dataset: activeDataset.id,
              opacity: 1,
              visibility: true,
              layers: [activeDataset.layer],
            },
          ].concat([...newActiveDatasets]);

          dispatch(
            setMapSettings({
              datasets: newActiveDatasets,
            })
          );

          // close modal
          dispatch(setMyDataModalSettings(null));
        }
      })
      .catch((error) => {
        console.log(error);

        let err = (error.response && error.response.data) || [];

        err = err && err.detail;

        if (!err && error.message) {
          err = error.message;
        }

        return {
          [FORM_ERROR]: err,
        };
      });
  }
);

export const getMyDataRasters = createThunkAction(
  "getMyDataRasters",
  (datasetId) => (dispatch) => {
    dispatch(setMyDataLoading({ loading: true, error: false }));

    getMyDatasetRasterFiles(datasetId)
      .then((rasterFiles) => {
        if (rasterFiles && !!rasterFiles.length) {
          const myRasterFiles = rasterFiles.reduce((all, item) => {
            if (all[item.dataset_id]) {
              all[item.dataset_id].push(item);
            } else {
              all[item.dataset_id] = [item];
            }

            return all;
          }, {});

          dispatch(setMyDataRasterFiles(myRasterFiles));
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

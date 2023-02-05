import { createSelector, createStructuredSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import {
  getAllMyDatasets,
  getManagerSection,
} from "providers/mydata-provider/selectors";

const selectMyDatasetModalState = (state, { myDatasetId }) => myDatasetId;
const selectMyDatasetModalIntent = (state, { myDataIntent }) => myDataIntent;
const selectLoading = (state) => state.myData && state.myData.loading;
const selectLoggedIn = (state) =>
  state.myHw && state.myHw.data && state.myHw.data.loggedIn;
const selectUserData = (state) => state.myHw && state.myHw.data;

const selectMyDataUploads = (state) => state.myData && state.myData.uploads;
const selectMyDataRasterFiles = (state) =>
  state.myData && state.myData.rasterFiles;
const selectUploading = (state) => state.myData && state.myData.uploading;

export const getActiveMyDataset = createSelector(
  [selectMyDatasetModalState, getAllMyDatasets],
  (myDatasetId, myDatasets) => {
    if (isEmpty(myDatasets)) return null;
    return myDatasets.find((a) => a.id === myDatasetId);
  }
);

export const getInitialValues = createSelector(
  [selectUserData, getActiveMyDataset],
  (userData, myDataset) => {
    const { id: userId, country } = userData;

    const { ...rest } = myDataset?.datasetDetails || {};

    return {
      user_id: userId,
      data_type: "raster",
      country: country,
      ...rest,
    };
  }
);

export const getFormTitle = createSelector(
  [getInitialValues, selectMyDatasetModalIntent],
  ({ name } = {}, myDataIntent) => {
    if (name && myDataIntent === "update") {
      return "Update Dataset";
    }

    return "Create Dataset";
  }
);

export const getMyDataProps = createStructuredSelector({
  loading: selectLoading,
  loggedIn: selectLoggedIn,
  activeMyDataset: getActiveMyDataset,
  initialValues: getInitialValues,
  title: getFormTitle,
  modalIntent: selectMyDatasetModalIntent,
  managerSection: getManagerSection,
  myDataUploads: selectMyDataUploads,
  myDataRasterFiles: selectMyDataRasterFiles,
  uploading: selectUploading,
});

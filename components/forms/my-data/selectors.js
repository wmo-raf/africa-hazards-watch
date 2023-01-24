import { createSelector, createStructuredSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import { getAllMyDatasets } from "providers/mydata-provider/selectors";

const selectMyDatasetModalState = (state, { myDatasetId }) => myDatasetId;
const selectMyDatasetModalIntent = (state, { myDataIntent }) => myDataIntent;
const selectLoading = (state) => state.myData && state.myData.loading;
const selectLoggedIn = (state) =>
  state.myHw && state.myHw.data && state.myHw.data.loggedIn;
const selectLocation = (state) => state.location && state.location.payload;
const selectUserData = (state) => state.myHw && state.myHw.data;

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
    const { id: userId } = userData;

    const { ...rest } = myDataset?.datasetDetails || {};

    return {
      user_id: userId,
      data_type: "raster",
      ...rest,
    };
  }
);

export const getFormTitle = createSelector(
  [getInitialValues, selectMyDatasetModalIntent],
  ({ name } = {}, myDataIntent) => {
    if (name && myDataIntent === "edit") {
      return "Edit Dataset";
    }

    if (name && myDataIntent === "upload") {
      return "Upload Files";
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
});

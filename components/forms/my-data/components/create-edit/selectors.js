import { createSelector, createStructuredSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import { getAllMyDatasets } from "providers/mydata-provider/selectors";

const selectMyDatasetModalState = (state, { myDatasetId }) => myDatasetId;
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

export const getMyDataProps = createStructuredSelector({
  initialValues: getInitialValues,
});

import { createSelector, createStructuredSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import { getAllMyDatasets } from "providers/mydata-provider/selectors";

const selectMyDatasetModalState = (state, { myDatasetId }) => myDatasetId;
const selectLoading = (state) => state.mydata && state.mydata.loading;
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

    const { ...rest } = myDataset || {};

    return {
      user_id: userId,
      ...rest,
    };
  }
);

export const getFormTitle = createSelector(
  [getInitialValues],
  ({ userDataset } = {}) => {
    if (userDataset) {
      return "Edit Dataset";
    }

    return "Create Dataset";
  }
);

export const getMyDataProps = createStructuredSelector({
  loading: selectLoading,
  loggedIn: selectLoggedIn,
  initialValues: getInitialValues,
  title: getFormTitle,
});

import { createSelector, createStructuredSelector } from "reselect";

import { getAllMyDatasets } from "providers/mydata-provider/selectors";

const selectMyDataLoading = (state) => state.myData && state.areas?.loading;
const selectMyHwLoading = (state) => state.areas && state.myHw?.loading;
const selectUserData = (state) => state.myHw && state.myHw?.data;

const getLoading = createSelector(
  [selectMyDataLoading, selectMyHwLoading],
  (myDataLoading, myHwLoading) => myDataLoading || myHwLoading
);

export const getMyDataModalProps = createStructuredSelector({
  loading: getLoading,
  userData: selectUserData,
  myDatasets: getAllMyDatasets,
});

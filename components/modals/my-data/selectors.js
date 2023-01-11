import { createSelector, createStructuredSelector } from "reselect";

const selectMyDataLoading = (state) => state.mydata && state.areas?.loading;
const selectMyHwLoading = (state) => state.areas && state.myHw?.loading;
const selectUserData = (state) => state.myHw && state.myHw?.data;

const getLoading = createSelector(
  [selectMyDataLoading, selectMyHwLoading],
  (myDataLoading, myHwLoading) => myDataLoading || myHwLoading
);

export const getMyDataModalProps = createStructuredSelector({
  loading: getLoading,
  userData: selectUserData,
});
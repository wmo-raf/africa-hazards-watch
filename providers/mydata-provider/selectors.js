import { createSelector, createStructuredSelector } from "reselect";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";

export const selectMyDataLoading = (state) =>
  state.myData && state.myData.loading;
export const selectLoggedIn = (state) =>
  state && !!state.myHw && !isEmpty(state.myHw.data);
const getMyDataSettings = (state) => state.myData?.settings || {};

export const getAllMyDatasets = (state) =>
  state &&
  state.myData &&
  sortBy(
    state.myData.data.map((a) => ({
      ...a,
      lowercaseName: a.name && a.name.toLowerCase(),
    })),
    "lowercaseName"
  );

export const getUploadSection = createSelector(
  [getMyDataSettings],
  (settings) => settings.uploadSection
);

export const getMyDataProps = createStructuredSelector({
  myDatasets: getAllMyDatasets,
  loading: selectMyDataLoading,
  loggedIn: selectLoggedIn,
});

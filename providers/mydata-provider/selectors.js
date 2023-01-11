import { createSelector, createStructuredSelector } from "reselect";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";

export const selectMyDataLoading = (state) =>
  state.mydata && state.mydata.loading;
export const selectLoggedIn = (state) =>
  state && !!state.myHw && !isEmpty(state.myHw.data);

export const getAllMyDatasets = (state) =>
  state &&
  state.mydata &&
  sortBy(
    state.mydata.data.map((a) => ({
      ...a,
      lowercaseName: a.name && a.name.toLowerCase(),
    })),
    "lowercaseName"
  );

export const getMyDataProps = createStructuredSelector({
  myDatasets: getAllMyDatasets,
  loading: selectMyDataLoading,
  loggedIn: selectLoggedIn,
});

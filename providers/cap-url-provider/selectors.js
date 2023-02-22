import { createSelector, createStructuredSelector } from "reselect";

export const selectCapUrl = (state) => state.cap?.capUrl;

export const getUrlParams = createSelector([selectCapUrl], (capUrl) => {
  return {
    capUrl: capUrl,
  };
});

export default createStructuredSelector({
  urlParams: getUrlParams,
});

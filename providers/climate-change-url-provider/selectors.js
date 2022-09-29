import { createSelector, createStructuredSelector } from "reselect";

export const selectMetaModalKey = (state) => state.modalMeta?.metakey;

export const getUrlParams = createSelector(
  [selectMetaModalKey],
  (modalMeta) => {
    return {
      modalMeta,
    };
  }
);

export default createStructuredSelector({
  urlParams: getUrlParams,
});

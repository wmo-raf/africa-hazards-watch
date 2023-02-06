import { createSelector, createStructuredSelector } from "reselect";

import { getAllAreas } from "providers/areas-provider/selectors";

const selectAreasLoading = (state) => state.areas && state.areas?.loading;
const selectMyHwLoading = (state) => state.areas && state.myHw?.loading;
const selectUserData = (state) => state.myHw && state.myHw?.data;

const getLoading = createSelector(
  [selectAreasLoading, selectMyHwLoading],
  (areasLoading, MyHwLoading) => areasLoading || MyHwLoading
);

export const getAOIModalProps = createStructuredSelector({
  loading: getLoading,
  userData: selectUserData,
  areas: getAllAreas,
});

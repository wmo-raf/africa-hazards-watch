import { createSelector, createStructuredSelector } from "reselect";

const selectLocation = (state) => state.location && state.location;
const selectLocationPayload = (state) =>
  state.location && state.location.payload;

const selectSelectedPlaceName = (state) =>
  state.climateChange && state.climateChange.selectedPlaceName;

const selectClimateChangeDataLoading = (state) =>
  state.climateChange && state.climateChange.loading;

export const getClimateChangeProps = createStructuredSelector({
  location: selectLocationPayload,
  selectedPlaceName: selectSelectedPlaceName,
  loading: selectClimateChangeDataLoading,
});

import { createStructuredSelector } from "reselect";

const selectLocationPayload = (state) =>
  state.location && state.location.payload;

const selectSelectedPlaceName = (state) =>
  state.climateChange && state.climateChange.selectedPlaceName;

const selectClimateChangeData = (state) =>
  state.climateChange && state.climateChange.data;

const selectClimateChangeDataLoading = (state) =>
  state.climateChange && state.climateChange.loading;

export const getWidgetProps = createStructuredSelector({
  location: selectLocationPayload,
  selectedPlaceName: selectSelectedPlaceName,
  data: selectClimateChangeData,
  loading: selectClimateChangeDataLoading,
});

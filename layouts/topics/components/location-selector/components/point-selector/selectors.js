import { createStructuredSelector } from "reselect";

const selectSelectedPlaceName = (state) =>
  state.climateChange && state.climateChange.selectedPlaceName;

export const getSelectorProps = createStructuredSelector({
  selectedPlaceName: selectSelectedPlaceName,
});

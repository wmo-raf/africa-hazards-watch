import { createStructuredSelector } from "reselect";

const isServer = typeof window === "undefined";

export const selectLocation = (state) =>
  state.location && state.location.payload;

export const getLocationSelectorProps = createStructuredSelector({
  location: selectLocation,
});

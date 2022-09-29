import * as actions from "./actions";

export const initialState = {
  data: {},
  selectedPlaceName: null,
  loading: false,
};

const setClimateChangeData = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
});

const setSelectedPlaceName = (state, { payload }) => ({
  ...state,
  selectedPlaceName: payload,
});

const setClimateChangeDataLoading = (state, { payload }) => ({
  ...state,
  loading: payload,
});

export default {
  [actions.setClimateChangeData]: setClimateChangeData,
  [actions.setSelectedPlaceName]: setSelectedPlaceName,
  [actions.setClimateChangeDataLoading]: setClimateChangeDataLoading,
};

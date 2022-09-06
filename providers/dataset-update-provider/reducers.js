import * as actions from "./actions";

export const initialState = {
  layerUpdatingStatus: {},
  layerLoadingStatus: {},
  timestamps: {},
  geojsonData: {},
};

const setLayerUpdatingStatus = (state, { payload }) => ({
  ...state,
  layerUpdatingStatus: { ...state.layerUpdatingStatus, ...payload },
});

const setLayerLoadingStatus = (state, { payload }) => ({
  ...state,
  layerLoadingStatus: { ...state.layerLoadingStatus, ...payload },
});

const setTimestamps = (state, { payload }) => ({
  ...state,
  timestamps: { ...state.timestamps, ...payload },
});

const setGeojsonData = (state, { payload }) => ({
  ...state,
  geojsonData: { ...state.geojsonData, ...payload },
});

export default {
  [actions.setTimestamps]: setTimestamps,
  [actions.setGeojsonData]: setGeojsonData,
  [actions.setLayerUpdatingStatus]: setLayerUpdatingStatus,
  [actions.setLayerLoadingStatus]: setLayerLoadingStatus,
};

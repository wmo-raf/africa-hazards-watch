import * as actions from "./actions";

export const initialState = {
  loading: false,
  error: "",
  alert: null,
  geostore: { loading: false, data: {} },
  analysis: { loading: false, data: {} },
};

const setCapGeostore = (state, { payload }) => ({
  ...state,
  geostore: { ...state.geostore, ...payload },
});

const setCapAnalysis = (state, { payload }) => ({
  ...state,
  analysis: { ...state.analysis, ...payload },
});

const setCapLoading = (state, { payload }) => ({
  ...state,
  loading: payload.loading,
  error: payload.error,
});

const setCapAlert = (state, { payload }) => ({
  ...state,
  alert: payload,
});

export default {
  [actions.setCapGeostore]: setCapGeostore,
  [actions.setCapAnalysis]: setCapAnalysis,
  [actions.setCapLoading]: setCapLoading,
  [actions.setCapAlert]: setCapAlert,
};

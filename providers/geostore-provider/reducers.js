import * as actions from "./actions";

export const initialState = {
  loading: false,
  error: false,
  data: {},
  mapLocationGeostore: {},
};

const setGeostore = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
  loading: false,
  error: false,
});

const setMapLocationContextGeostore = (state, { payload }) => ({
  ...state,
  mapLocationGeostore: {
    ...state.mapLocationGeostore,
    ...payload,
  },
  loading: false,
  error: false,
});

const clearGeostore = (state) => ({
  ...state,
  data: {},
});

const setGeostoreLoading = (state, { payload }) => ({
  ...state,
  ...payload,
});

export default {
  [actions.setGeostore]: setGeostore,
  [actions.setMapLocationContextGeostore]: setMapLocationContextGeostore,
  [actions.clearGeostore]: clearGeostore,
  [actions.setGeostoreLoading]: setGeostoreLoading,
};

import * as actions from "./actions";

export const initialState = {
  loading: false,
  error: false,
  data: {},
};

const setMyHWLoading = (state, { payload }) => ({
  ...state,
  ...payload,
  data: {},
});

const setMyHW = (state, { payload }) => ({
  ...state,
  data: payload,
  loading: false,
  error: false,
});

export default {
  [actions.setMyHW]: setMyHW,
  [actions.setMyHWLoading]: setMyHWLoading,
};

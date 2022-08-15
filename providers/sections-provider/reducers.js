import * as actions from "./actions";

export const initialState = {
  loading: true,
  error: false,
  data: [],
};

const setSectionsLoading = (state, { payload }) => ({
  ...state,
  ...payload,
});

const setSections = (state, { payload }) => ({
  ...state,
  data: payload,
  loading: false,
});

export default {
  [actions.setSectionsLoading]: setSectionsLoading,
  [actions.setSections]: setSections,
};

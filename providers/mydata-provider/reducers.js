import findIndex from "lodash/findIndex";
import * as actions from "./actions";

export const initialState = {
  loading: false,
  error: false,
  data: [],
};

const setMyDatasets = (state, { payload }) => ({
  ...state,
  data: payload,
});

const setMyDataset = (state, { payload }) => {
  const myDataset = {
    ...payload,
  };

  const { data: myDatasets } = state;

  const index = findIndex(myDatasets, ["id", myDataset.id]);
  const data = [...myDatasets];

  if (index > -1) {
    data.splice(index, 1, myDataset); // substitution
  } else {
    data.push(myDataset); // addition
  }
  return {
    ...state,
    data,
  };
};

const setMyDataLoading = (state, { payload }) => ({
  ...state,
  loading: payload.loading,
  error: payload.error,
});

export default {
  [actions.setMyDatasets]: setMyDatasets,
  [actions.setMyDataset]: setMyDataset,
  [actions.setMyDataLoading]: setMyDataLoading,
};

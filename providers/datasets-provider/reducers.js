import * as actions from "./actions";

export const initialState = {
  loading: true,
  error: false,
  meta: null,
  data: [],
};

const setDatasetsLoading = (state, { payload }) => ({
  ...state,
  ...payload,
});

const setDatasets = (state, { payload }) => ({
  ...state,
  data: payload,
  loading: false,
});

const updateDatasets = (state, { payload }) => {
  const newDatasets = [...payload];

  const { data: datasets } = state;

  const data = [...datasets];

  for (let i = 0; i < newDatasets.length; index++) {
    const dataset = newDatasets[i];

    const index = findIndex(datasets, ["id", dataset.id]);

    if (index > -1) {
      data.splice(index, 1, area); // substitution
    } else {
      data.push(area); // addition
    }
  }

  console.log(data);

  return {
    ...state,
    data,
  };
};

const setDatasetsWithMetadata = (state, { payload }) => ({
  ...state,
  ...payload,
});

export default {
  [actions.setDatasets]: setDatasets,
  [actions.setDatasetsLoading]: setDatasetsLoading,
  [actions.updateDatasets]: updateDatasets,
};

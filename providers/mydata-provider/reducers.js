import findIndex from "lodash/findIndex";
import * as actions from "./actions";

export const initialState = {
  loading: false,
  error: false,
  data: [],
  settings: {
    managerSection: "upload",
  },
  uploading: { loading: false, error: "", errorMessage: "" },
  uploads: {},
  rasterFiles: {},
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

const removeMyDataset = (state, { payload }) => {
  const myDatasetToRemove = { ...payload };

  const { data: myDatasets } = state;

  const data = [...myDatasets];

  const index = findIndex(myDatasets, ["id", myDatasetToRemove.id]);

  if (index > -1) {
    data.splice(index, 1); // remove from array
  }

  return {
    ...state,
    data,
  };
};

const setMyDataSettings = (state, { payload }) => ({
  ...state,
  settings: {
    ...state.settings,
    ...payload,
  },
});

const setMyDataLoading = (state, { payload }) => ({
  ...state,
  loading: payload.loading,
  error: payload.error,
});

const setMyDataUploads = (state, { payload }) => ({
  ...state,
  uploads: { ...state.uploads, ...payload },
});

const setMyDataRasterFiles = (state, { payload }) => ({
  ...state,
  rasterFiles: { ...state.rasterFiles, ...payload },
});

const updateMyDataUploads = (state, { payload }) => {
  const upload = {
    ...payload,
  };

  const myUploads = { ...state.uploads };

  if (myUploads[upload.dataset_id]) {
    const myDatasetUploads = myUploads[upload.dataset_id] || [];

    const index = findIndex(myDatasetUploads, ["id", upload.id]);

    const data = [...myDatasetUploads];

    if (index > -1) {
      data.splice(index, 1, upload); // substitution
    } else {
      data.push(upload); // addition
    }

    myUploads[upload.dataset_id] = data;
  } else {
    myUploads[upload.dataset_id] = [upload];
  }

  return {
    ...state,
    uploads: myUploads,
  };
};

const removeMyDataUploads = (state, { payload }) => {
  const upload = {
    ...payload,
  };

  const myUploads = { ...state.uploads };

  if (myUploads[upload.dataset_id]) {
    const myDatasetUploads = myUploads[upload.dataset_id] || [];

    const index = findIndex(myDatasetUploads, ["id", upload.id]);

    const data = [...myDatasetUploads];

    if (index > -1) {
      data.splice(index, 1); // substitution
    }

    myUploads[upload.dataset_id] = data;
  }

  return {
    ...state,
    uploads: myUploads,
  };
};

const setMyDataUploading = (state, { payload }) => ({
  ...state,
  uploading: { ...state.uploading, ...payload },
});

export default {
  [actions.setMyDatasets]: setMyDatasets,
  [actions.setMyDataset]: setMyDataset,
  [actions.removeMyDataset]: removeMyDataset,
  [actions.setMyDataLoading]: setMyDataLoading,
  [actions.setMyDataSettings]: setMyDataSettings,
  [actions.setMyDataUploads]: setMyDataUploads,
  [actions.updateMyDataUploads]: updateMyDataUploads,
  [actions.setMyDataUploading]: setMyDataUploading,
  [actions.removeMyDataUploads]: removeMyDataUploads,
  [actions.setMyDataRasterFiles]: setMyDataRasterFiles,
};

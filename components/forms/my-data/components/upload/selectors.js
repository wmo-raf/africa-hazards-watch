import { createSelector, createStructuredSelector } from "reselect";

import { getUploadSection } from "providers/mydata-provider/selectors";

const selectMyDataUploads = (state) => state.myData && state.myData.uploads;
const selectMyDataRasterFiles = (state) =>
  state.myData && state.myData.rasterFiles;
const selectLoading = (state) => state.myData && state.myData.loading;
const selectUploading = (state) => state.myData && state.myData.uploading;

export const getMyDataUploadProps = createStructuredSelector({
  uploadSection: getUploadSection,
  myDataUploads: selectMyDataUploads,
  myDataRasterFiles: selectMyDataRasterFiles,
  loading: selectLoading,
  uploading: selectUploading,
  uploading: selectUploading,
});

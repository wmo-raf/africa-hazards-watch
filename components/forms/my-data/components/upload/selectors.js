import { createStructuredSelector } from "reselect";

const selectMyDataUploads = (state) => state.myData && state.myData.uploads;
const selectLoading = (state) => state.myData && state.myData.loading;
const selectUploading = (state) => state.myData && state.myData.uploading;

export const getMyDataUploadProps = createStructuredSelector({
  myDataUploads: selectMyDataUploads,
  loading: selectLoading,
  uploading: selectUploading,
});

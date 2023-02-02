import { createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import {
  saveMyDataset as saveMyDataseReq,
  deleteMyDataset as deleteMyDatasetReq,
} from "services/mydata";

import { setMyDataset } from "providers/mydata-provider/actions";
import { updateDatasets } from "providers/datasets-provider/actions";

export const saveMyDataset = createThunkAction(
  "saveMyDataset",
  ({ user_id, name, data_type, data_variable, country }) => (
    dispatch,
    getState
  ) => {
    const postData = { user_id, name, data_type, data_variable };

    return saveMyDataseReq(postData)
      .then((myDataset) => {
        dispatch(setMyDataset(myDataset));

        const dataset = {
          ...myDataset.mapDataset,
          userDataset: true,
        };

        // update main datasets
        dispatch(updateDatasets([dataset]));
      })
      .catch((error) => {
        let err = (error.response && error.response.data) || [];

        err = err && err.detail;

        if (!err && error.message) {
          err = error.message;
        }

        return {
          [FORM_ERROR]: err,
        };
      });
  }
);

export const deleteMyDataset = createThunkAction(
  "deleteMyDataset",
  ({ id, clearAfterDelete, callBack }) => (dispatch, getState) => {
    return deleteMyDatasetReq(id)
      .then(() => {})
      .catch((error) => {
        const { errors } = error.response.data;

        return {
          [FORM_ERROR]: errors[0].detail,
        };
      });
  }
);

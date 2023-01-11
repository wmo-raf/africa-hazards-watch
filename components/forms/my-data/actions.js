import { createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import { saveArea, deleteArea } from "services/areas";

import {
  setArea,
  setAreas,
  viewArea,
  clearArea,
} from "providers/areas-provider/actions";

export const saveMyDataset = createThunkAction(
  "saveMyDataset",
  ({ user_id, name, viewAfterSave }) => (dispatch, getState) => {
    const postData = {
      id,
      name,
    };

    return saveMyDataset(postData)
      .then((myDataset) => {
        // dispatch(setMyDataset({ ...myDataset }));
      })
      .catch((error) => {
        let { errors } = (error.response && error.response.data) || [];

        let err = errors && errors[0] && errors[0].detail;

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
    return deleteMyDataset(id)
      .then(() => {})
      .catch((error) => {
        const { errors } = error.response.data;

        return {
          [FORM_ERROR]: errors[0].detail,
        };
      });
  }
);

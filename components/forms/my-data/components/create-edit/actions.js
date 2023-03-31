import { createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import {
  saveMyDataset as saveMyDataseReq,
  deleteMyDataset as deleteMyDatasetReq,
} from "services/mydata";

import {
  setMyDataset,
  removeMyDataset,
} from "providers/mydata-provider/actions";
import {
  updateDatasets,
  removeDataset,
} from "providers/datasets-provider/actions";

import { setMyDataModalSettings } from "components/modals/my-data/actions";

export const saveMyDataset = createThunkAction(
  "saveMyDataset",
  ({ id, user_id, name, data_type, data_variable, country }) => (
    dispatch,
    getState
  ) => {
    const postData = { id, user_id, name, data_type, data_variable };

    return saveMyDataseReq(postData)
      .then((myDataset) => {
        dispatch(setMyDataset(myDataset));

        const dataset = {
          ...myDataset.mapDataset,
          userDataset: true,
        };

        // update main datasets
        dispatch(updateDatasets([dataset]));

        dispatch(
          setMyDataModalSettings({
            myDatasetId: myDataset.id,
            myDataIntent: "update",
          })
        );
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
  ({ id, callBack }) => (dispatch) => {
    return deleteMyDatasetReq(id)
      .then((myDataset) => {
        // remove my dataset
        dispatch(removeMyDataset(myDataset));

        const dataset = {
          ...myDataset.mapDataset,
          userDataset: true,
        };

        // remove dataset
        dispatch(removeDataset(dataset));

        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        return {
          [FORM_ERROR]: error,
        };
      });
  }
);
